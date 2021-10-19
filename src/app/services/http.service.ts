import {Injectable} from '@angular/core';
import {Http, HttpDownloadFileResult, HttpOptions} from '@capacitor-community/http';
import {Directory, Filesystem} from '@capacitor/filesystem';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  doGet(url): Observable<any> {
    const options: HttpOptions = {
      url
    };
    return from(Http.get(options));
  }

  async downloadFile(url) {
    const options = {
      url,
      filePath: `image.jpg`,
      fileDirectory: Directory.Documents,
      method: 'GET'
    };

    const response: HttpDownloadFileResult = await Http.downloadFile(options);
    if (response.path) {
      const read = await Filesystem.readFile({
        path: `image.jpg`,
        directory: Directory.Documents
      });
      return `data:image/jpeg;base64,${read.data}`;
    } else if (response.blob) {
      // Special handling for the web
      return await this.convertBlobToBase64(response.blob) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

}
