import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibraryPage } from './library.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'book-category',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LibraryPage,
    children: [
      {
        path: 'book-category',
        loadChildren: () => import('../book-category/book-category.module').then( m => m.BookCategoryPageModule)
      },
      {
        path: 'request-book',
        loadChildren: () => import('../request-book/request-book.module').then( m => m.RequestBookPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryPageRoutingModule {}
