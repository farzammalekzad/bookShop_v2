import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {Directory, Filesystem} from '@capacitor/filesystem';
import {Storage} from '@capacitor/storage';

export const BOOK_KEY = 'book';

@Injectable({
  providedIn: 'root'
})
export class DownloadBookService {
  downloadProgress = 0;
  myBooks = [];

  constructor(private http: HttpClient, private fileOpener: FileOpener) { }

  downloadBook(url) {
    const proxyUrl = `https://api-cors-proxy-devdactic.herokuapp.com/${url}`;
    return this.http.get(proxyUrl, {
      responseType: 'blob',
      reportProgress: true,
      observe: 'events'
    }).subscribe(async (event) => {
      if (event.type === HttpEventType.DownloadProgress ) {
        this.downloadProgress = Math.round(100 * (event.loaded/event.total));
      } else if (event.type === HttpEventType.Response) {
        this.downloadProgress = 0;
        const name = `${Date.now()}`;
        const base64 = await this.convertBlobToBase64(event.body) as string;
        const savedFile = await Filesystem.writeFile({
          path: name,
          data: base64,
          directory: Directory.Documents
        });
        const path = savedFile.uri;
        const mimeType = this.getMimeType(name);
        this.fileOpener.open(path,mimeType).then(() => {
          console.log('File Opened');
        }).catch((err) => {
          console.log('error in opening file', err);
        });
        this.myBooks.unshift(path);
        await Storage.set({key: BOOK_KEY, value: JSON.stringify(this.myBooks)});
      }
    });
  }

  public convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
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
