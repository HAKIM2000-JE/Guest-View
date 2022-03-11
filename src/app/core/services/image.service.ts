import {EventEmitter, Injectable} from '@angular/core';
// @ts-ignore
import imageCompression from 'browser-image-compression';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  handleImageUpload(event): Observable<File> {

    const emitter = new EventEmitter<File>();
    const imageFile = event.target.files[0];

    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };

    imageCompression(imageFile, options)
      .then(compressedFile => {
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        emitter.emit(compressedFile);
        // return this.uploadToServer(compressedFile); // write your own logic
      })
      .catch(error => {
        console.log(error.message);
        emitter.error(error);
      });
    return emitter.asObservable();
  }

  uploadToServer(file: File | Blob): boolean {
    return true;
  }

}
