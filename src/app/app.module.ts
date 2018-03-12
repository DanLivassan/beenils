import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HomePage} from "../pages/home/home";
import {PublicationViewPage} from "../pages/publication-view/publication-view";
import {PublicationProvider} from "../providers/publication/publication";
import {EditorialProvider} from "../providers/editorial/editorial";
import {HttpClientModule} from "@angular/common/http";
import {EditorialPage} from "../pages/editorial/editorial";
import {PublicationListPage} from "../pages/publication-list/publication-list";
import {UserProvider} from "../providers/user/user";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PublicationViewPage,
    EditorialPage,
    PublicationListPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PublicationViewPage,
    EditorialPage,
    PublicationListPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PublicationProvider,
    EditorialProvider,
    UserProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
