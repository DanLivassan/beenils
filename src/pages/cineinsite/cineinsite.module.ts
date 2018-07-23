import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CineinsitePage } from './cineinsite';

@NgModule({
  declarations: [
    CineinsitePage,
  ],
  imports: [
    IonicPageModule.forChild(CineinsitePage),
  ],
})
export class CineinsitePageModule {}
