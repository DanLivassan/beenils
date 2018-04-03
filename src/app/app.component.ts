import { Component, ViewChild } from '@angular/core';

import {Platform, MenuController, Nav, NavController, App, Events} from 'ionic-angular';
import {HomePage} from "../pages/home/home";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {EditorialPage} from "../pages/editorial/editorial";
import {PublicationListPage} from "../pages/publication-list/publication-list";
import {UserProvider} from "../providers/user/user";
import {SigninPage} from "../pages/signin/signin";
import {User} from "../models/user";
import {Params} from "../utils/params";
import {ApproveNewsPage} from "../pages/approve-news/approve-news";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page

  rootPage;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public userProvider:UserProvider,
    public app:App,
    public events:Events
  ) {
    this.initializeApp();
    if(!this.userProvider.isAuthenticated()){
      this.rootPage = SigninPage;
    }
    else{
      this.rootPage = HomePage;
    }

    this.events.subscribe('user:logged',(user:User)=>{
      if(user.is('administrador')){
        this.pages = [
          { title: 'Home', component: HomePage, icon:'fa-home' },
          { title: 'Editorial', component: EditorialPage, icon: 'fa-list-ul'},
          { title: 'Notícias', component: PublicationListPage, icon:'fa-pencil'},
        ];
      }
      else if(user.is('leitor')){
        this.pages = [
          { title: 'Home', component: HomePage, icon:'fa-home' },
          { title: 'Editorial', component: EditorialPage, icon: 'fa-list-ul'},
          //{ title: 'Notícias', component: PublicationListPage, icon:'fa-pencil'},
        ];
      }
      else if(user.is('editor')){
        this.pages = [
          { title: 'Home', component: HomePage, icon:'fa-home' },
          { title: 'Editorial', component: EditorialPage, icon: 'fa-list-ul'},
          { title: 'Aprovar Notícias', component: ApproveNewsPage, icon:'fa-pencil'},
        ];
      }
    });




  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  logout(){
    if(this.userProvider.isAuthenticated()){
      //this.userProvider.logout();
    }
    this.menu.close();

    let nav = this.app.getRootNav();
    nav.setRoot(SigninPage);
    nav.popAll().then(()=>{

    })

  }
}
