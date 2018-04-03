import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApproveNewsPage } from './approve-news';

@NgModule({
  declarations: [
    ApproveNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(ApproveNewsPage),
  ],
})
export class ApproveNewsPageModule {}
