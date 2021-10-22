import {Injectable} from '@angular/core';
import {Http, HttpDownloadFileResult, HttpOptions} from '@capacitor-community/http';
import {Directory, Filesystem} from '@capacitor/filesystem';
import {from, Observable} from 'rxjs';
import {Storage} from '@capacitor/storage';
import {BOOK_KEY} from './download-book.service';
import {FileOpener} from '@ionic-native/file-opener/ngx';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  myBooks = [];

  constructor(private fileOpener: FileOpener) { }

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

  async downloadBook(url) {
    const options = {
      url,
      filePath: `${Date.now()}.pdf`,
      fileDirectory: Directory.Documents,
      method: 'GET'
    };
    const response: HttpDownloadFileResult = await Http.downloadFile(options);
    if (response.path) {
      const name = `${Date.now()}`;
      const mimeType = this.getMimeType(name);
      this.fileOpener.open(response.path,mimeType).then(() => {
        console.log('File Opened');
      }).catch((err) => {
        console.log('error in opening file', err);
      });
      this.myBooks.unshift(response.path);
      await Storage.set({key: BOOK_KEY, value: JSON.stringify(this.myBooks)});
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public getMimeType(name) {
    if (name.indexOf('pdf') >= 0) {
      return 'application/pdf';
    } else if (name.indexOf('chm') >= 0) {
      return 'application/chm';
    }
  }

}
