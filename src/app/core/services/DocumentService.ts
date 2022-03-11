import {EventEmitter, Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {flatMap, mergeMap} from 'rxjs/operators';
// @ts-ignore
import imageCompression from 'browser-image-compression';
import {ApiService} from '../http/api.service';
import {ConfService} from './conf.service';
import {UploadUrlDto} from '../../models/YaagoDocument';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  constructor(private http: HttpClient,
              private zone: NgZone,
              private apiService: ApiService,
              private confService: ConfService) {
  }
  uploadLinksGeneration(files: File[]): Observable<UploadUrlDto[]> {
    const listToSend = [];
    files.forEach(file => {
      listToSend.push({filename: file.name, contentType: file.type});
    });

      return this.http.post<UploadUrlDto[]>(this.confService.getBackendApiEndPoint() + 'api-v2/document/multiple-upload', listToSend, ApiService.getHeaders());
  }

  storageDirectUpload(url: string, file: File) {
    return this.http.put<any>(url, file, this.apiService.getEmptyHeadersForUpload());
  }
  uploadDocument(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('content', file, file.name);
    return this.http.post<any>(this.confService.getBackendApiEndPoint() + 'api-v2/document', formData, ApiService.getHeadersForUpload()); // {headers: new HttpHeaders()});
  }
  uploadDocuments(files: any[]): Observable<any[]> {
    const obs = [...files].map(file => {
      return this.uploadDocument(file);
    });
    return forkJoin(obs);
  }
  deleteDocument(url: string): Observable<void>  {
    let param: HttpParams = new HttpParams();
    param = param.set('url', url);
    return this.http.delete<void>(this.confService.getBackendApiEndPoint() + 'api-v2/document', ApiService.getOptionsWithParams(param));
  }
  uploadPhotos(files: any[]): Observable<any[]> {
    const obs = [...files].map(file => {
      return this.uploadPhoto(file);
    });
    return forkJoin(obs);
  }
  uploadPhoto(photo: any): Observable<any> {
    return this.handleImageUpload(photo).pipe(mergeMap((blob) => {
      const formData = new FormData();
      formData.append('content', blob, photo.name);

      return this.http.post<any>(this.confService.getBackendApiEndPoint() + 'api-v2/document', formData, ApiService.getHeadersForUpload()); // {headers: new HttpHeaders()});
    }));
  }

  handleImageUpload(file): Observable<File> {
    const emitter = new EventEmitter<File>();
    const imageFile = file;

    console.log('original file instanceof Bloc', imageFile instanceof Blob);
    console.log('compressFile size ${imageFile.size / 1024 / 1024} MB');

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };

    imageCompression(imageFile, options).then(compressedFile => {
      console.log('compressed file instanceof Bloc', compressedFile instanceof Blob);
      console.log(`compressFile size ${compressedFile.size / 1024 / 1024} MB`);
      this.zone.run(() => { // Zone run here to ensure view is properly refreshed.
        emitter.emit(compressedFile);
        emitter.complete();
      });
    })
      .catch(error => {
        console.log(error.message);
        emitter.error(error);
      })
    ;
    return emitter.asObservable();
  }

  /*uploadPhoto(imageFile: File): Observable<any> {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    return imageCompression(imageFile, options).then(compressedFile => {
      console.log('compressed file instanceof Bloc', compressedFile instanceof Blob);
      console.log('compressFile size ${compressedFile.size / 1024 / 1024} MB');
      return this.uploadDocument(compressedFile);
    }).catch(error => {
      console.log(error.message);
      return of(null);
    });
  }*/


}
