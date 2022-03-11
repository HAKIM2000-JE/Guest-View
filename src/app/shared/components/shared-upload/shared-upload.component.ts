import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';

import {Subject} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {finalize, takeUntil} from "rxjs/operators";
import {SnackbarMessage} from '../shared-snackbar/models/snackbar-message';
import {SharedSnackbarComponent} from '../shared-snackbar/shared-snackbar.component';
import {SharedSnackbarService} from '../shared-snackbar/services/shared-snackbar.service';
import {DocumentService} from '../../../core/services/DocumentService';
import {DocType, DocumentUploadTypes, UploadUrlDto, YaagoDocument} from '../../../models/YaagoDocument';

@Component({
  selector: 'app-shared-upload',
  templateUrl: './shared-upload.component.html',
  styleUrls: ['./shared-upload.component.scss']
})
export class SharedUploadComponent implements OnInit, OnDestroy {
  @Input() btnType = 'inline-blue';
  @Input() uploadType: 'single' | 'multiple' = 'single';
  @Input() id: string = 'upload-btn';
  @Input() btnLabel: string = 'documents.upload';
  @Input() allowedTypes: string[] = DocumentUploadTypes.all();
  @Input() hideButton: boolean = false;
  isUploading = false;
  @Output()uploading = new EventEmitter<boolean>();
  @Output() docUploaded = new EventEmitter<YaagoDocument>();

  @ViewChild('fileUploader', null) fileUploader: ElementRef;

  private _onDestroy = new Subject();
  selectedFiles: File[] = [];


  constructor(private snackbar: SharedSnackbarService, private translate: TranslateService,
              private documentService: DocumentService ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  onFileChoosed(event: any) {
    console.log(event);
    const arrayFiles: File[] = Array.from(event.target.files)
    if (!this.isValidFileTypes(arrayFiles)) {
      this.snackbar.push(new SnackbarMessage(this.translate.instant('documents.filetypes-not-supported'), 'error'));
      return;
    }
    this.selectedFiles = arrayFiles;
    this.documentService.uploadLinksGeneration(arrayFiles)
      .pipe(takeUntil(this._onDestroy),
        finalize(() => {this.fileUploader.nativeElement.value = ''; }))
      .subscribe(urlsDtoList => {
        this.startUploadProcess(urlsDtoList);
      });
  }
  isValidFileTypes(files: File[]): boolean {
    toto: FileList;

    console.log('FILES', files);
    const types = [];
    files.forEach(file => {
      types.push(file.type);
    });
    const matched = types.filter(type => this.allowedTypes.includes(type));
    return matched.length === types.length;
  }

  async startUploadProcess(urlsDtoList: UploadUrlDto[]) {
    this.isUploading = true;
    this.uploading.emit(this.isUploading);
    await Promise.all(urlsDtoList.map(async (doc, index) => {
      await this.upload(doc, this.selectedFiles[index]);
    }));
    this.isUploading = false;
    this.uploading.emit(this.isUploading);
    this.selectedFiles = [];
  }
  upload(doc: UploadUrlDto, file: File): Promise<any> {
    return this.documentService.storageDirectUpload(doc.url, file).toPromise().then(
      res => {
        console.log('RESULT-DIRECT', res, doc);
        const yaagoDocument = new YaagoDocument();
        yaagoDocument.title = file.name;
        yaagoDocument.type = this.getDocType(file.type);
        yaagoDocument.url = this.cleanSignedUrl(doc.url);
        console.log('EMITTED', yaagoDocument);
        this.docUploaded.emit(yaagoDocument);
      },
      err => {
        this.isUploading = false;
        this.uploading.emit(this.isUploading);
      }
    );
  }

  getDocType(type: string) {
    if (DocumentUploadTypes.videos().includes(type)) {
      return DocType.VIDEO;
    }
    if (DocumentUploadTypes.images().includes(type)) {
      return DocType.IMAGE;
    }
    if (DocumentUploadTypes.pdf().includes(type)) {
      return DocType.PDF;
    }
    if (DocumentUploadTypes.words().includes(type)) {
      return DocType.WORD;
    }
    return null;
  }

  cleanSignedUrl(url: string) {
    if (url.includes('?X-Goog-Algorithm')) {
      return url.substr(0, url.indexOf('?X-Goog-Algorithm'));
    }
    return url;
  }
}
