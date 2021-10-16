import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestBookPage } from './request-book.page';

const routes: Routes = [
  {
    path: '',
    component: RequestBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestBookPageRoutingModule {}
