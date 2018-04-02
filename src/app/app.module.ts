import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MomentModule } from 'angular2-moment';

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
import {SigninPage} from "../pages/signin/signin";
import {EditorialPublicationsViewPage} from "../pages/editorial-publications-view/editorial-publications-view";
import {ComponentsModule} from "../components/components.module";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PublicationViewPage,
    EditorialPage,
    PublicationListPage,
    PublicationViewPage,
    EditorialPublicationsViewPage,
    SigninPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    MomentModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PublicationViewPage,
    EditorialPage,
    PublicationViewPage,
    PublicationListPage,
    EditorialPublicationsViewPage,
    SigninPage,
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
