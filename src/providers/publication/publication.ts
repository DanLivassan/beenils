import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Publication} from "../../models/publication";
import {EditorialProvider} from "../editorial/editorial";
import {User} from "../../models/user";
import {PublicationCommentary} from "../../models/publication-commentary";
import {Editorial} from "../../models/editorial";
import {Observable} from "rxjs/Observable";
import {UserProvider} from "../user/user";
import {Params} from "../../utils/params";
import {jsonpFactory} from "@angular/http/src/http_module";


@Injectable()
export class PublicationProvider {

  private publications:Publication[]=[];
  constructor(public http: HttpClient,private editorialProvider:EditorialProvider, private userProvider:UserProvider) {

  }

  getAll():Publication[]{
    return this.publications;
  }

  refreshData(){

      if(this.userProvider.isAuthenticated()) {
        let url = Params.getBaseUrl() + '/v1/publication/all';
        let headers = new HttpHeaders({
          'Authorization': 'Bearer ' + this.userProvider.getToken(),
        });
        let params = new HttpParams();
        params = params.set('limit','50');

        return this.http.get(url, {headers:headers, params:params});
      }
      else{
        return null;
      }

  }

  public extractData(data){
    let publications = data;
    let pubs =[];
    publications.forEach((publication)=>{
      pubs.push(new Publication(
        publication['id'],
        publication['title'],
        publication['content'],
        publication['created_at'],
        new User(
          publication['created_by']['id'],
          publication['created_by']['name'],
          publication['created_by']['last_name'],
          publication['created_by']['type']['id'],
          publication['created_by']['status']['id']
        ),
        publication['status']['description'],
        this.editorialProvider.get(publication['editorial']['id']),
        publication['type']['id'],
        publication['exclusive']['id'],
        publication['scope']['id'],
        publication['cover_image'],
        publication['views'],
        publication['address']['city'],
        []
      ));
    });
    this.publications = pubs;

    return pubs;
  }

  get(id:number):Publication{
    let publication = this.publications.filter(pub=>pub.id===id)[0];
    if(typeof publication === 'undefined'){
      return null;
    }
    return publication;
  }

  getOnServer(id:number){
    if(this.userProvider.isAuthenticated()) {
      let url = Params.getFrontUrl() + '/site/get-publication/'+id;
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.userProvider.getToken(),
      });

      return this.http.get(url, {headers:headers});
    }
    else{
      return null;
    }
  }

  formatResponse(publication):Publication{
    let pub:Publication = new Publication(
      publication['id'],
      publication['title'],
      publication['content'],
      publication['created_at'],
      new User(
        publication['created_by']['id'],
        publication['created_by']['name'],
        publication['created_by']['last_name'],
        publication['created_by']['type']['id'],
        publication['created_by']['status']['id']
      ),
      publication['status']['description'],
      this.editorialProvider.get(publication['editorial']['id']),
      publication['type']['id'],
      publication['exclusive']['id'],
      publication['scope']['id'],
      publication['cover_image'],
      publication['views'],
      publication['address']['city'],
      []
    );
  return pub;
  }

  getByEditorial(editorial:Editorial):Publication[]{

    return this.publications.filter((publication)=>{
      return publication.editorial.id == editorial.id
    });
  }


  getPendingNews(editorial_id:string){
    if(this.userProvider.isAuthenticated()) {
      let url = Params.getBaseUrl() + '/v1/publication/all';
      let params = new HttpParams();
      params = params.append('limit','5');
      params = params.append('editorial',editorial_id);
      params = params.append('status',Publication.NewsStatus['pendente']);

      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.userProvider.getToken(),
      });

      return this.http.get(url,
        {
          headers:headers,
          params:params,
        });
    }
    else{
      return null;
    }
  }

}
