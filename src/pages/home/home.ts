import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides, ToastController} from 'ionic-angular';
import {EditorialProvider} from "../../providers/editorial/editorial";
import {PublicationProvider} from "../../providers/publication/publication";
import {Editorial} from "../../models/editorial";
import {UserProvider} from "../../providers/user/user";
import {PublicationViewPage} from "../publication-view/publication-view";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  private task;
  private editorials:Editorial[]=[];
  private editorial_segment = 1;
  private number_slide=1;
  private publications = [];
  private segment_publications = []
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private pubProvider:PublicationProvider,
              private edtProvider:EditorialProvider,
              private userProvider:UserProvider,
              private toastCtrl:ToastController
              ) {

  }

  ionViewCanEnter(){
    return this.userProvider.isAuthenticated();
  }
  ionViewWillEnter(){

    this.edtProvider.refreshData();
    this.pubProvider.getAllFromServer();
    this.editorials = this.edtProvider.getAll();
    this.publications = this.pubProvider.getAll();

  }
  ionViewDidEnter(){
    this.task = setInterval(()=>{
      this.changeSlides();
    },3000);
    console.log('this.publication: ')
    console.log(this.publications);
    this.editorials.forEach((edit, i)=>{
      this.segment_publications[edit.id]=this.pubProvider.getByEditorial(edit);
    });

  }


  changeSlides() {
    if(this.number_slide>=this.publications.length){
      this.number_slide=0;
    }
    else{
      this.number_slide++;
    }
    this.slides.slideTo(this.number_slide,500);
  }

  publicationView(id:number){
    let publication = this.pubProvider.get(id);
    if(publication != null){
      this.navCtrl.push(PublicationViewPage, {'publication':publication});
    }
    else{
      this.presentToast("Notícia não encontrada", 3000, 'top');
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
