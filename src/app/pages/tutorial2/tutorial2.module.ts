import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tutorial2PageRoutingModule } from './tutorial2-routing.module';

import { Tutorial2Page } from './tutorial2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tutorial2PageRoutingModule
  ],
  declarations: [Tutorial2Page]
})
export class Tutorial2PageModule {}
