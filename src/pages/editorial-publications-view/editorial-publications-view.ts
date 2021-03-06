import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PublicationProvider} from "../../providers/publication/publication";
import {Editorial} from "../../models/editorial";
import {PublicationViewPage} from "../publication-view/publication-view";
import {UserProvider} from "../../providers/user/user";
import {Params} from "../../utils/params";
import {AppFooterComponent} from "../../components/app-footer/app-footer"
import {Publication} from "../../models/publication";

/**
 * Generated class for the EditorialPublicationsViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-editorial-publications-view',
  templateUrl: 'editorial-publications-view.html',
})
export class EditorialPublicationsViewPage {

  private editorial:Editorial;
  private editorialPublications=[];
  private page:number;
  private front_url = Params.getFrontUrl();
  private btn_visible:boolean = true;

  constructor(public navCtrl: NavController,private userProvider:UserProvider, public navParams: NavParams, private pubProvider:PublicationProvider) {
    this.editorial = this.navParams.get('editorial');
  }
  ionViewWillLoad(){
    this.page = 1;
    if(this.editorial){
      let search:Array<{name:string,value:string}> = [];
      search.push({name:'editorial', value:this.editorial.id.toString()});
      search.push({name:'type', value: Publication.PublicationType.news});
      this.pubProvider.getPublications('5', null,this.page.toString(),null,null, search).subscribe((pubs)=>{
        this.editorialPublications = this.pubProvider.extractData(pubs);
      });

    }
  }

  ionViewDidLoad() {

  }

  ionViewCanEnter(){
    return this.userProvider.isAuthenticated();
  }

  publicationView(id){
      if(id != null){
        this.pubProvider.get(id).subscribe((pub)=>{
          let publication = this.pubProvider.formatResponse(pub);
          this.navCtrl.push(PublicationViewPage, {'publication':publication});
        });
      }
  }

  moreNews(){
    let search:Array<{name:string, value:string}> = [];
    search.push({name:'editorial', value:this.editorial.id.toString()});
    this.page++;
    this.pubProvider.getPublications(
      '5',
      null,
      this.page.toString(),
      null,
      null,
      search).subscribe((data)=>{
      let pubs = this.pubProvider.extractData(data);
      pubs.forEach((pub)=>{
        this.editorialPublications.push(pub);
      });
      if(pubs.length==0){
        this.btn_visible = false;
        this.page--;
      }
    });
  }

}
