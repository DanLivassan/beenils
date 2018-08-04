import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CineListPage } from './cine-list';

@NgModule({
  declarations: [
    CineListPage,
  ],
  imports: [
    IonicPageModule.forChild(CineListPage),
  ],
})
export class CineListPageModule {}
