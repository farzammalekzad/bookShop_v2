import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloadedBookPageRoutingModule } from './downloaded-book-routing.module';

import { DownloadedBookPage } from './downloaded-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadedBookPageRoutingModule
  ],
  declarations: [DownloadedBookPage]
})
export class DownloadedBookPageModule {}
