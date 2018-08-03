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
import {ApproveNewsPage} from "../pages/approve-news/approve-news";
import {SignupPage} from "../pages/signup/signup";
import { PublicationReactionProvider } from '../providers/publication-reaction/publication-reaction';
import { CommentaryProvider } from '../providers/commentary/commentary';
import {SocialSharing} from "@ionic-native/social-sharing";
import {ProfilePage} from "../pages/profile/profile";
import {SubmitNewsPage} from "../pages/submit-news/submit-news";
import {BrMaskerIonic3, BrMaskerModule} from "brmasker-ionic-3";
import {ApproveCommentsPage} from "../pages/approve-comments/approve-comments";
import {PublicationPreviewPage} from "../pages/publication-preview/publication-preview";
import { SocketIoModule, SocketIoConfig} from "ng-socket-io";
import {Params} from "../utils/params";
import {Push} from "@ionic-native/push";
import {AdMobFree} from "@ionic-native/admob-free";
import {Firebase} from "@ionic-native/firebase";
import { FcmProvider } from '../providers/fcm/fcm';
import { CineinsiteProvider } from '../providers/cineinsite/cineinsite';
import {CineinsitePage} from "../pages/cineinsite/cineinsite";
import {CineinsiteCategoryPage} from "../pages/cineinsite-category/cineinsite-category";
import {CineinsiteMovietheatersPage} from "../pages/cineinsite-movietheaters/cineinsite-movietheaters";
import {CineinsiteViewPage} from "../pages/cineinsite-view/cineinsite-view";
import {RecoverPage} from "../pages/recover/recover";

//const config: SocketIoConfig = {url:Params.getWebSocketUrl(), options:{}};
const firebase = {
  apiKey:'',
  authDomain:'',
  databaseURL:'',
  projectId:'',
  storageBucket:'',
  messagingSenderId:''
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PublicationViewPage,
    EditorialPage,
    PublicationListPage,
    PublicationViewPage,
    EditorialPublicationsViewPage,
    SignupPage,
    SigninPage,
    ApproveNewsPage,
    ProfilePage,
    SubmitNewsPage,
    ApproveCommentsPage,
    PublicationPreviewPage,
    CineinsitePage,
    CineinsiteCategoryPage,
    CineinsiteMovietheatersPage,
    CineinsiteViewPage,
    RecoverPage
  ],
  imports: [
    BrowserModule,
    //SocketIoModule.forRoot(config),
    HttpClientModule,
    ComponentsModule,
    MomentModule,
    BrMaskerModule,
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
    SignupPage,
    ApproveNewsPage,
    ProfilePage,
    SubmitNewsPage,
    ApproveCommentsPage,
    PublicationPreviewPage,
    CineinsitePage,
    CineinsiteCategoryPage,
    CineinsiteMovietheatersPage,
    CineinsiteViewPage,
    RecoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PublicationProvider,
    EditorialProvider,
    UserProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PublicationReactionProvider,
    CommentaryProvider,
    SocialSharing,
    Push,
    AdMobFree,
    Firebase,
    FcmProvider,
    CineinsiteProvider,

  ]
})
export class AppModule {}
