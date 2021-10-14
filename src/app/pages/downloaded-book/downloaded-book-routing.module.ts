import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadedBookPage } from './downloaded-book.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadedBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadedBookPageRoutingModule {}
