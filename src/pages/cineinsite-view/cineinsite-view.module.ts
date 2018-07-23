import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CineinsiteViewPage } from './cineinsite-view';

@NgModule({
  declarations: [
    CineinsiteViewPage,
  ],
  imports: [
    IonicPageModule.forChild(CineinsiteViewPage),
  ],
})
export class CineinsiteViewPageModule {}
