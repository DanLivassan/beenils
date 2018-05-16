import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Publication} from "../../models/publication";
import {EditorialProvider} from "../editorial/editorial";
import {User} from "../../models/user";
import {Editorial} from "../../models/editorial";
import {UserProvider} from "../user/user";
import {Params} from "../../utils/params";
import * as moment from "moment";
import "moment-timezone";



@Injectable()
export class PublicationProvider {

  private publications:Publication[]=[];
  constructor(public http: HttpClient,private editorialProvider:EditorialProvider, private userProvider:UserProvider) {

  }

  getAll():Publication[]{
    return this.publications;
  }


  getPublications(limit?:string, address?:string, page?:string, except?:string, treding?:string, search?:Array<{name:string, value:string}>){

      if(this.userProvider.isAuthenticated()) {
        let url = Params.getBaseUrl() + '/v1/publication/all';
        let headers = new HttpHeaders({
          'Authorization': 'Bearer ' + this.userProvider.getToken(),
        });
        let params = new HttpParams();
        if(limit !=null){
          try{
            let value = parseInt(limit)
            params = params.append('limit',value.toString());
          }
          catch (e){
            console.error(e);
          }
        }
        if(address !=null){
          params = params.append('address',address);
        }
        if(page !=null){
          try{
            let value = parseInt(page)
            params = params.append('page',value.toString());
          }
          catch (e){
            console.error(e);
          }
        }
        if(except !=null){

          params = params.append('except',except.toString());

        }
        if(treding !=null){

          params = params.append('treding',treding.toString());

        }
        if(search !=null){
          search.forEach((s)=>{
            params = params.append('search['+s.name+']',s.value);
          })
        }

        return this.http.get(url, {headers:headers, params:params});
      }
      else{
        return null;
      }

  }

  public extractData(data){

    let publications = data['items'];
    let pubs =[];

    publications.forEach((publication)=>{

      pubs.push(new Publication(
        publication['id'],
        publication['title'],
        publication['content'],
        moment(publication['created_at']).tz('America/Sao_paulo').format(),
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

  get(id:number){
    if(this.userProvider.isAuthenticated()) {
      let url = Params.getBaseUrl() + '/v1/publication/'+id;
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


  getPendingNews(limit?:string, address?:string, page?:string, search?:Array<{name:string, value:string}>){
    if(this.userProvider.isAuthenticated()) {
      let url = Params.getBaseUrl() + '/v1/publication/all-pending';

      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.userProvider.getToken(),
      });

      let params = new HttpParams();
      if(limit){
        params = params.append('limit',limit);
      }
      else{
        params = params.append('limit','1');
      }


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

  approvePublication(publicationId:number){
    if(this.userProvider.isAuthenticated() && this.userProvider.getUser().is('editor')){
      let url = Params.getBaseUrl()+'/v1/publication/'+publicationId+'/approve';
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.userProvider.getToken(),
      });
      return this.http.patch(url,{},{headers:headers});
    }
    return null;
  }

  submitPublication(publicationId:number){
    if(this.userProvider.isAuthenticated() && this.userProvider.getUser().is('jornalista')){
      let url = Params.getBaseUrl()+'/v1/publication/'+publicationId+'/submit';
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.userProvider.getToken(),
      });
      return this.http.patch(url,{},{headers:headers});
    }
    return null;
  }

  getUrl(publicationId:number):string{
    return Params.getFrontUrl()+'/publication/view/'+publicationId;
  }
}
