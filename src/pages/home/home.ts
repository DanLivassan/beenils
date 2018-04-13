import {Component, ViewChild} from '@angular/core';
import {IonicPage, Segment, NavController, NavParams, Slides, ToastController, Events} from 'ionic-angular';
import {EditorialProvider} from "../../providers/editorial/editorial";
import {PublicationProvider} from "../../providers/publication/publication";
import {Editorial} from "../../models/editorial";
import {UserProvider} from "../../providers/user/user";
import {PublicationViewPage} from "../publication-view/publication-view";
import {Params} from "../../utils/params";
import {Functions} from "../../utils/functions"
import {ProfilePage} from "../profile/profile";
import {AppFooterComponent} from "../../components/app-footer/app-footer"
import {Publication} from "../../models/publication";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild(Segment) private segment:Segment;
  private frontUrl = Params.getFrontUrl();
  private task;
  private user_points;
  private editorials:Editorial[]=[];
  private editorial_guides=[];
  private editorial_segment;
  private number_slide=1;
  private publications = [];
  private segment_publications = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pubProvider:PublicationProvider,
    private edtProvider:EditorialProvider,
    private userProvider:UserProvider,
    private toastCtrl:ToastController,
    private events:Events
  ) {

  }

  ionViewCanEnter(){
    return this.userProvider.isAuthenticated();
  }
  ionViewWillEnter(){
    //Slider Publications
    this.pubProvider.getPublications('5',null, null, null, null, null).subscribe((data:Array<any>)=>{
      this.publications = this.pubProvider.extractData(data);
    });

    //Guides Publications
    this.edtProvider.refreshData().subscribe((data) => {
      this.editorials = this.edtProvider.extractData(data);
      this.editorials.forEach((edt,index)=>{

        let search:Array<{name:string, value:string}> = [];
        search.push({name:'editorial', value:edt.id.toString()});
        this.pubProvider.getPublications('10',null, null, null, null, search).subscribe((data)=>{
          this.editorial_guides.push(
            {
              data:edt,
              is_active:index==0,
              publications:this.pubProvider.extractData(data)
            });
        });
      });

    });
  }

  changeEditorial(index:number){

    this.editorial_guides.forEach((a,i)=>{
      this.editorial_guides[i].is_active = (index==i);
    });
  }
  ionViewDidEnter(){
    this.task = setInterval(()=>{
      this.changeSlides();
    },3000);
    this.editorials.forEach((edit, i)=>{
      if(edit !=null){
        if(i==1){
          this.editorial_segment = edit.id;
        }

        this.segment_publications[edit.id]=this.pubProvider.getByEditorial(edit);
      }

    });

    if(this.segment){
      this.segment.ngAfterContentInit();
    }

    this.events.publish('user:refresh_points',this.userProvider.getUser());
    this.events.publish('user:logged',this.userProvider.getUser());
    this.user_points = Functions.formatPoints(this.userProvider.getUser().points);
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
    if(id != null){
      this.pubProvider.get(id).subscribe((pub)=>{
        let publication = this.pubProvider.formatResponse(pub);
        this.navCtrl.push(PublicationViewPage, {'publication':publication});
      });

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

  segmentChanged(event){
    //console.log(this.editorial_segment);
  }

  goToProfile(){
    this.navCtrl.push(ProfilePage,
      {
        user:this.userProvider.getUser()
      });
  }

}
