import { Component, ViewChild } from '@angular/core';

import {Platform, MenuController, Nav, NavController, App, Events, ToastController} from 'ionic-angular';
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
import {SubmitNewsPage} from "../pages/submit-news/submit-news";
import {Editorial} from "../models/editorial";
import {ApproveCommentsPage} from "../pages/approve-comments/approve-comments";
import {SocialSharing} from "@ionic-native/social-sharing";
import {FcmProvider} from "../providers/fcm/fcm";
import {tap} from "rxjs/operators";
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import {PublicationViewPage} from "../pages/publication-view/publication-view";
import {PublicationProvider} from "../providers/publication/publication";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page

  rootPage;
  pages: Array<{title: string, component: any, icon: string, color: string, editorial_id?:number}>=[];
  group_pages:Array<{title: string, component: any, icon: string, color: string, editorial_id?:number}>=[];
  group_name = null;
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public userProvider:UserProvider,
    public app:App,
    public editorialProvider:EditorialProvider,
    public events:Events,
    public socialSharing:SocialSharing,
    public fcm:FcmProvider,
    public push:Push,
    public pubProvider:PublicationProvider,
    public toastCtrl:ToastController
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
          { title: 'Notícias', component: EditorialPublicationsViewPage, icon: 'fa-list-ul', color:'bg-night-dark', editorial_id:Editorial.NOTICIAS_ID},
          { title: 'Esportes', component: EditorialPublicationsViewPage, icon: 'fa-futbol-o', color:'bg-green-dark', editorial_id:Editorial.ESPORTES_ID},
          { title: 'Entretenimento', component: EditorialPublicationsViewPage, icon: 'fa-thumbs-up', color:'bg-blue-dark', editorial_id:Editorial.ENTRETENIMENTO_ID},
          { title: 'Cultura', component: EditorialPublicationsViewPage, icon: 'fa-image', color:'bg-magenta-dark', editorial_id:Editorial.CULTURA_ID},
          { title: 'Mais editorias', component: EditorialPage, icon: 'fa-list-ul', color:'bg-night-dark'},
        ];
      }
      else if(user.is('editor')){
        this.pages = [
          { title: 'Home', component: HomePage, icon:'fa-home', color:'bg-red-dark'},
          { title: 'Notícias', component: EditorialPublicationsViewPage, icon: 'fa-list-ul', color:'bg-night-dark', editorial_id:Editorial.NOTICIAS_ID},
          { title: 'Esportes', component: EditorialPublicationsViewPage, icon: 'fa-futbol-o', color:'bg-green-dark', editorial_id:Editorial.ESPORTES_ID},
          { title: 'Entretenimento', component: EditorialPublicationsViewPage, icon: 'fa-thumbs-up', color:'bg-blue-dark', editorial_id:Editorial.ENTRETENIMENTO_ID},
          { title: 'Cultura', component: EditorialPublicationsViewPage, icon: 'fa-image', color:'bg-magenta-dark', editorial_id:Editorial.CULTURA_ID},
          { title: 'Mais editorias', component: EditorialPage, icon: 'fa-list-ul', color:'bg-night-dark'},
        ];
        this.group_name = "Editor";
        this.group_pages =[
          { title: 'Aprovar Notícias', component: ApproveNewsPage, icon:'fa-pencil', color:'bg-green-dark'},
          { title: 'Aprovar Comentários', component: ApproveCommentsPage, icon:'fa-pencil', color:'bg-red-dark'},
        ];
      }
      else if(user.is('jornalista')){
        this.pages = [
          //{ title: 'Editoriais', component: EditorialPage, icon: 'fa-list-ul', color:'bg-night-dark'},
          //{ title: 'Submeter Notícias', component: SubmitNewsPage, icon:'fa-pencil', color:'bg-green-dark'},
          { title: 'Home', component: HomePage, icon:'fa-home', color:'bg-red-dark'},
          { title: 'Notícias', component: EditorialPublicationsViewPage, icon: 'fa-list-ul', color:'bg-night-dark', editorial_id:Editorial.NOTICIAS_ID},
          { title: 'Esportes', component: EditorialPublicationsViewPage, icon: 'fa-futbol-o', color:'bg-green-dark', editorial_id:Editorial.ESPORTES_ID},
          { title: 'Entretenimento', component: EditorialPublicationsViewPage, icon: 'fa-thumbs-up', color:'bg-blue-dark', editorial_id:Editorial.ENTRETENIMENTO_ID},
          { title: 'Cultura', component: EditorialPublicationsViewPage, icon: 'fa-image', color:'bg-magenta-dark', editorial_id:Editorial.CULTURA_ID},
          { title: 'Mais editorias', component: EditorialPage, icon: 'fa-list-ul', color:'bg-night-dark'},
        ];
      }

    });


    // Tratando os eventos para atualizar os pontos.
    // Este evento é disparado sempre que exista uma ação que modifique pontos
    this.events.subscribe('user:refresh_points', (user:User)=>{
      this.userProvider.refreshPoints(user.id).subscribe((points:number)=>{
        user.points = points;
        this.userProvider.setUser(user);
      });
    });


    //Enviar token para o serviço de push
    this.fcm.getToken();

    // to check if we have permission

    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          const options: PushOptions = {
            android: {},
            ios: {
              alert: 'true',
              badge: true,
              sound: 'false'
            },
            windows: {},
            browser: {
              pushServiceURL: 'http://push.api.phonegap.com/v1/push'
              //https://fcm.googleapis.com/fcm/send
            }
          };

          const pushObject: PushObject = this.push.init(options);


          pushObject.on('notification').subscribe((notification: any) => {
            this.presentToast(notification.title+'\n'+notification.message,2000,'bottom');
          });

          pushObject.on('registration').subscribe((notification: any) => {

          });
          pushObject.on('error').subscribe((error: any) => {
            alert(error)
          });
        } else {
          //alert('We do not have permission to send push notifications');
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

    this.menu.close();
    if(page.editorial_id!=null){
      this.editorialProvider.refreshData().subscribe((edt)=>{
          this.editorialProvider.extractData(edt);
          this.nav.push(page.component,{'editorial':this.editorialProvider.get(page.editorial_id)});
      });

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

  shareApp(){

    if(this.userProvider.isAuthenticated()){
      this.socialSharing.share(
        "Faça sua conta!",
        "Beenils Mobile",
        null,
        'http://admin.beenils.com.br/user/sign-up/'+this.userProvider.getUser().user_token
        );
    }
  }

  publicationView(id:number){
    if(id != null){
      this.pubProvider.get(id).subscribe((pub)=>{
        let publication = this.pubProvider.formatResponse(pub);
        this.nav.push(PublicationViewPage, {'publication':publication});
      });
    }
  }

  presentToast(message:string, duration:number, position:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });

    toast.present();
  }
}
