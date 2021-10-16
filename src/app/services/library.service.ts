import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {filter, map} from "rxjs/operators";
export interface AcademicModel {
  _id: string;
  field: string;
  imageUrl: string;
  description: string;
  books: [BookModel];
}

export interface BookModel {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  pdfUrl: string;
  description: string;
  fullVersion: boolean;
  createdAt: Date;
}

export interface BookData {
  title: string;
  author: string;
  imageUrl: string;
  pdfUrl: string;
  description: string;
  fullVersion: boolean;
}

export interface RespPostBook {
  message: string;
  status: string;
  book: BookModel;

}

interface CategoryData {
  field: string;
  imageUrl: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private category: BehaviorSubject<[AcademicModel]> = new BehaviorSubject<[AcademicModel]>(null);

  constructor(private http: HttpClient) { }

  public getAllCategoriesFromServer(): Observable<[AcademicModel]> {
    return this.http.get<[AcademicModel]>('http://ketabyab.mohammad-malekzad.ir/academic/category');
  }

  public getAllCurrentCategories(): Observable<[AcademicModel]> {
    return this.category.asObservable();
  }

  public getCurrentCategoryById(id: string): Observable<AcademicModel> {
    return this.getAllCurrentCategories().pipe(map((ctg) => ctg.find((x) => x._id === id )));
  }

  public setCategory(data: [AcademicModel]) {
    return this.category.next(data);
  }

  public getAllBooks(): Observable<[BookModel][]> {
    return this.getAllCategoriesFromServer().pipe(map((ctg) => ctg.map((books) => books.books)));
  }

  public getBookById(id: string) {
    return this.getAllBooks().pipe(map((books) => books.map((book) => book.map((boo) => boo._id === id))));
  }

  public getSomeBooks() {
    return this.getAllBooks().pipe(map((x) => x.splice(1, 1)));
  }

}
