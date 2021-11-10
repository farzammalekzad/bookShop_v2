import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tutorial2Page } from './tutorial2.page';

const routes: Routes = [
  {
    path: '',
    component: Tutorial2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tutorial2PageRoutingModule {}
