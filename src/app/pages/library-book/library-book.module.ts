import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibraryBookPageRoutingModule } from './library-book-routing.module';

import { LibraryBookPage } from './library-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibraryBookPageRoutingModule
  ],
  declarations: [LibraryBookPage]
})
export class LibraryBookPageModule {}
