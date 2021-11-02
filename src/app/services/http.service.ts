import {Injectable} from '@angular/core';
import {Http, HttpDownloadFileResult, HttpOptions} from '@capacitor-community/http';
import {Directory, Filesystem} from '@capacitor/filesystem';
import {from, Observable} from 'rxjs';
import {Storage} from '@capacitor/storage';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {LoadingController} from '@ionic/angular';

export const BOOK_KEY = 'book';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  myBooks = [];

  constructor(private fileOpener: FileOpener, private loadingCtrl: LoadingController) { }

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

  async downloadBook(url, bookName) {
    const options = {
      url,
      filePath: `${bookName.substr(bookName.lastIndexOf(' ') + 1)}.pdf`,
      fileDirectory: Directory.Documents,
      method: 'GET'
    };
    const response: HttpDownloadFileResult = await Http.downloadFile(options);
    if (response.path) {
      const name = `book.pdf`;
      const mimeType = this.getMimeType(name);
      this.fileOpener.open(response.path,mimeType).then(async () => {
        console.log('File Opened');
      }).catch(async (err) => {
        console.log('error in opening file', err);
      });
      this.myBooks = await this.getBook();
      this.myBooks.unshift(response.path);
      await Storage.set({key: BOOK_KEY, value: JSON.stringify(this.myBooks)});
    }
  }

  async downloadBookChm(url, bookName) {
    const options = {
      url,
      filePath: `${bookName.substr(bookName.lastIndexOf(' ') + 1)}.chm`,
      fileDirectory: Directory.Documents,
      method: 'GET'
    };
    const response: HttpDownloadFileResult = await Http.downloadFile(options);
    if (response.path) {
      const name = `book.chm`;
      const mimeType = this.getMimeType(name);
      this.fileOpener.showOpenWithDialog(response.path,mimeType).then(async () => {
        console.log('File Opened');
      }).catch(async (err) => {
        console.log('error in opening file', err);
      });
      this.myBooks = await this.getBook();
      this.myBooks.unshift(response.path);
      await Storage.set({key: BOOK_KEY, value: JSON.stringify(this.myBooks)});
    }
  }

  async downloadBookEpub(url, bookName) {
    const options = {
      url,
      filePath: `${bookName.substr(bookName.lastIndexOf(' ') + 1)}.epub`,
      fileDirectory: Directory.Documents,
      method: 'GET'
    };
    const response: HttpDownloadFileResult = await Http.downloadFile(options);
    if (response.path) {
      const name = `book.epub`;
      const mimeType = this.getMimeType(name);
      this.fileOpener.showOpenWithDialog(response.path,mimeType).then(async () => {
        console.log('File Opened');
      }).catch(async (err) => {
        console.log('error in opening file', err);
      });
      this.myBooks = await this.getBook();
      this.myBooks.unshift(response.path);
      await Storage.set({key: BOOK_KEY, value: JSON.stringify(this.myBooks)});
    }
  }

  public async getBook() {
    const books = await Storage.get({key: BOOK_KEY});
    return JSON.parse(books.value) || [];
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
