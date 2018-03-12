import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {EditorialProvider} from "../../providers/editorial/editorial";
import {PublicationProvider} from "../../providers/publication/publication";
import {Editorial} from "../../models/editorial";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  private task;
  private editorial_segment=1;
  private editorials:Editorial[];

  private number_slide=1;
  private publications = [];
  private segment_publications = []
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private pubProvider:PublicationProvider,
              private edtProvider:EditorialProvider,
              private userProvider:UserProvider
              ) {
    this.editorials = this.edtProvider.getAll();
    this.editorials.forEach((edit, i)=>{
      this.segment_publications[edit.id]=this.pubProvider.getByEditorial(edit);
    });

    this.publications = pubProvider.getAll();
  }
  ionViewDidEnter(){
    this.task = setInterval(()=>{
      this.changeSlides();
    },3000);

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

}
