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
import {AdMobFree, AdMobFreeBannerConfig} from "@ionic-native/admob-free";
import {FcmProvider} from "../../providers/fcm/fcm";





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
  private editorial_guides:Array<{editorial:Editorial, is_active:boolean, page:number, publications:Publication[]}>=[];
  private active_guide:number;
  private number_slide=1;
  private publications = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pubProvider:PublicationProvider,
    private edtProvider:EditorialProvider,
    private userProvider:UserProvider,
    private toastCtrl:ToastController,
    private events:Events,
    //private socket:Socket,
    private admob:AdMobFree,
    private fcm:FcmProvider
  ) {

  }

  ionViewCanEnter(){
    return this.userProvider.isAuthenticated();
  }


  ionViewWillEnter(){

    this.active_guide = Editorial.NOTICIAS_ID;
    //Slider Publications
    this.pubProvider.getPublications('5',null, null, null, '1', null).subscribe((data:Array<any>)=>{
      this.publications = this.pubProvider.extractData(data);
    });

    //Guides Publications
    this.edtProvider.getDefault().subscribe((data) => {
      this.editorials = this.edtProvider.extractData(data);

      //Garantir ordem dos editoriais
      this.editorials.sort((edt1:Editorial, edt2:Editorial)=>{
        if(edt1.id>edt2.id) return 1;
        if(edt1.id<edt2.id) return -1;
        return 0;
      });
      console.log(this.editorials);

      this.editorials.forEach((edt,index)=>{

        let search:Array<{name:string, value:string}> = [];
        search.push({name:'editorial', value:edt.id.toString()});
        this.pubProvider.getPublications('5',null, null, null, null, search).subscribe((data)=>{
          this.editorial_guides.push(
            {
              editorial:edt,
              is_active:(index==0),
              page:1,
              publications:this.pubProvider.extractData(data)
            });
        });
        if(index>3) return false;
      });

    });

    //testing socket
    // this.socket.connect();
    //
    // this.socket.on('message',(a)=>{
    //   this.presentToast(a.message,3000, 'top');
    // });


  this.showBanner();
  }

  showBanner(){
    //Adding Banner Advertisement
    /*
    let bannerConfig: AdMobFreeBannerConfig = {
      isTesting: true, // Remove in production
      autoShow: true,
      id: Params.getBannerAdMobId()
    };

    this.admob.banner.config(bannerConfig);

    this.admob.banner.prepare().then(() => {

    }).catch(e => console.log(e));
    */
  }

  changeEditorial(index:number){

    this.editorial_guides.forEach((a,i)=>{
      if (index==i){
        this.editorial_guides[i].is_active = true;
        this.active_guide = i;
      }
      else{
        this.editorial_guides[i].is_active = false;
      }

    });
  }
  ionViewDidEnter(){
    if(typeof this.task === 'undefined'){
      this.task = setInterval(()=>{
        this.changeSlides();
      },3000);
    }

    if(this.segment){
      this.segment.ngAfterContentInit();
    }

    this.events.publish('user:refresh_points',this.userProvider.getUser());
    this.events.publish('user:logged',this.userProvider.getUser());
    this.user_points = Functions.formatPoints(this.userProvider.getUser().points);
    this.fcm.firebase.onNotificationOpen().subscribe((a)=>{
      this.publicationView(a.publicationId);
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

  loadMore(infiniteScroll){
    setTimeout(()=>{
      this.moreNews(this.active_guide);
      infiniteScroll.complete();
    }, 3000);

  }

  moreNews(index:number){
    let search:Array<{name:string, value:string}> = [];
    search.push({name:'editorial', value:this.editorial_guides[index].editorial.id.toString()});
    this.editorial_guides[index].page++;
    this.pubProvider.getPublications(
      '5',
      null,
      this.editorial_guides[index].page.toString(),
      null,
      null,
      search).subscribe((data)=>{
        let pubs = this.pubProvider.extractData(data);
        pubs.forEach((pub)=>{
          this.editorial_guides[index].publications.push(pub);
        });
        if(pubs.length==0){
          this.presentToast('Não temos mais notícias neste editorial', 3000,"bottom");
          this.editorial_guides[index].page--;
        }
    });
  }

}
