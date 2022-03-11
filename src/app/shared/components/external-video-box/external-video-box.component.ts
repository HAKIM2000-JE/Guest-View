import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SafeResourceUrl} from '@angular/platform-browser';
import {UtilsService} from "../../../core/services/utils.service";

@Component({
  selector: 'app-external-video-box',
  templateUrl: './external-video-box.component.html',
  styleUrls: ['./external-video-box.component.scss']
})
export class ExternalVideoBoxComponent implements OnInit, OnChanges {

  @Input() videoUrl: string;
  securedUrl: SafeResourceUrl;

  constructor(private utils: UtilsService) { }

  ngOnInit(): void {
    this.securedUrl = this.utils.sanitizeVideoUrl(this.videoUrl);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes && changes.videoUrl && changes.videoUrl.currentValue) {
      this.securedUrl = this.utils.sanitizeVideoUrl(this.videoUrl);
    } else {
      this.securedUrl = null;
    }
  }
}
