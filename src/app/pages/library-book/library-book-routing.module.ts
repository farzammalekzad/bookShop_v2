import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibraryBookPage } from './library-book.page';

const routes: Routes = [
  {
    path: '',
    component: LibraryBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryBookPageRoutingModule {}
