import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditorialPublicationsViewPage } from './editorial-publications-view';

@NgModule({
  declarations: [
    EditorialPublicationsViewPage,
  ],
  imports: [
    IonicPageModule.forChild(EditorialPublicationsViewPage),
  ],
})
export class EditorialPublicationsViewPageModule {}
