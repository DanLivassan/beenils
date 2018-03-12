import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicationViewPage } from './publication-view';

@NgModule({
  declarations: [
    PublicationViewPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicationViewPage),
  ],
})
export class PublicationViewPageModule {}
