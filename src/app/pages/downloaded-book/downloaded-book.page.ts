import {Component, OnInit} from '@angular/core';
import {BOOK_KEY, HttpService} from '../../services/http.service';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {Directory, Filesystem} from '@capacitor/filesystem';
import {Storage} from '@capacitor/storage';

@Component({
  selector: 'app-downloaded-book',
  templateUrl: './downloaded-book.page.html',
  styleUrls: ['./downloaded-book.page.scss'],
})
export class DownloadedBookPage implements OnInit {
  books = [];
  constructor(private httpService: HttpService, private fileOpener: FileOpener) { }

  ngOnInit() {
    this.httpService.getBook().then((books) => {
      this.books = books;
    });
  }

  openBook(book) {
    console.log(book);
    const name = book.substr(book.lastIndexOf('/') + 1);
    const mimeType = this.httpService.getMimeType(name);
    this.fileOpener.showOpenWithDialog(book, mimeType).then(() => {
      console.log('book opened');
    }).catch((e) => {
      console.log('Error: ', e);
    });
  }

  async deleteBook(book) {
    const name = book.substr(book.lastIndexOf('/') + 1);

    await Filesystem.deleteFile({
      path: name,
      directory: Directory.Documents
    });
    this.books = this.books.filter(filePath => filePath !== book);
    await Storage.set({
      key: BOOK_KEY,
      value: JSON.stringify(this.books)
    });

  }

}
