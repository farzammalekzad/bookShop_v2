import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestBookPageRoutingModule } from './request-book-routing.module';

import { RequestBookPage } from './request-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestBookPageRoutingModule
  ],
  declarations: [RequestBookPage]
})
export class RequestBookPageModule {}
