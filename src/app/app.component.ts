import { Component, ViewChild } from '@angular/core';

import {Platform, MenuController, Nav, NavController, App, Events} from 'ionic-angular';
import {HomePage} from "../pages/home/home";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {EditorialPage} from "../pages/editorial/editorial";
import {PublicationListPage} from "../pages/publication-list/publication-list";
import {EditorialPublicationsViewPage} from "../pages/editorial-publications-view/editorial-publications-view";
import {UserProvider} from "../providers/user/user";
import {SigninPage} from "../pages/signin/signin";
import {User} from "../models/user";
import {Params} from "../utils/params";
import {ApproveNewsPage} from "../pages/approve-news/approve-news";
import {EditorialProvider} from "../providers/editorial/editorial";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page

  rootPage;
  pages: Array<{title: string, component: any, icon: string, color: string, editorial_id?:number}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public userProvider:UserProvider,
    public app:App,
    public editorialProvider:EditorialProvider,
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
          { title: 'Home', component: HomePage, icon:'fa-home', color:'bg-red-dark'},
          { title: 'Editoriais', component: EditorialPage, icon: 'fa-list-ul', color:'bg-night-dark'},
          //{ title: 'Notícias', component: PublicationListPage, icon:'fa-pencil', color:'bg-green-dark'},
        ];
      }
      else if(user.is('leitor')){
        this.pages = [
          { title: 'Home', component: HomePage, icon:'fa-home', color:'bg-red-dark' },
          { title: 'Notícias', component: EditorialPublicationsViewPage, icon: 'fa-list-ul', color:'bg-night-dark', editorial_id:1},
          { title: 'Esportes', component: EditorialPublicationsViewPage, icon: 'fa-futbol-o', color:'bg-green-dark', editorial_id:2},
          { title: 'Entretenimento', component: EditorialPublicationsViewPage, icon: 'fa-thumbs-up', color:'bg-blue-dark', editorial_id:3},
          { title: 'Cultura', component: EditorialPublicationsViewPage, icon: 'fa-image', color:'bg-magenta-dark', editorial_id:4},
        ];
      }
      else if(user.is('editor')){
        this.pages = [
          { title: 'Home', component: HomePage, icon:'fa-home', color:'bg-red-dark'},
          { title: 'Editoriais', component: EditorialPage, icon: 'fa-list-ul', color:'bg-night-dark'},
          { title: 'Aprovar Notícias', component: ApproveNewsPage, icon:'fa-pencil', color:'bg-green-dark'},
        ];
      }
    });

    this.events.subscribe('user:refresh_points', (user:User)=>{
      this.userProvider.refreshPoints(user.id).subscribe((points)=>{
        user.points = points['value'];
        this.userProvider.setUser(user);
      });
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

    this.menu.close();
    if(page.editorial_id!=null){
      this.nav.push(page.component,{'editorial':this.editorialProvider.get(page.editorial_id)});
    }
    else{
      this.nav.setRoot(page.component);
    }

  }

  logout(){
    if(this.userProvider.isAuthenticated()){
      this.menu.close();
      this.nav.setRoot(SigninPage).then(()=>{
        this.userProvider.logout();
      });
    }

    //window.location.reload();
  }
}
