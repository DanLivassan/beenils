import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicationListPage } from './publication-list';

@NgModule({
  declarations: [
    PublicationListPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicationListPage),
  ],
})
export class PublicationListPageModule {}
