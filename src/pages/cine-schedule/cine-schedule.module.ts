import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CineSchedulePage } from './cine-schedule';

@NgModule({
  declarations: [
    CineSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(CineSchedulePage),
  ],
})
export class CineSchedulePageModule {}
