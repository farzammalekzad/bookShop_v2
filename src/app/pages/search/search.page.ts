import { Component, OnInit } from '@angular/core';
import {BookModel, LibraryService} from '../../services/library.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {


  constructor(private libraryService: LibraryService) { }

  ngOnInit() {

  }

}
