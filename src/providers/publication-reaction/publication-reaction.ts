import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Params} from "../../utils/params";
import {Observable} from "rxjs/Observable";
import {PublicationReaction} from "../../models/publication-reaction";
import {UserProvider} from "../user/user";

/*
  Generated class for the PublicationReactionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PublicationReactionProvider {

  private publicationReactions:PublicationReaction[]=[];

  constructor(public http: HttpClient, public userProvider:UserProvider) {

  }

  refreshData(publicationId:number){
    let url = Params.getBaseUrl() + '/v1/publication/reactions/'+publicationId;
    return this.http.get(url);
  }

  extractData(data:any){
    data = data['items'];
    if(data instanceof Array){
      let reacts:PublicationReaction[]=[];
      data.forEach((reaction:{type:number, publication:number, user:number})=>{
        reacts.push(
          new PublicationReaction(
            reaction.user,
            reaction.publication,
            reaction.type
          ));
      });
      this.publicationReactions = reacts;
      return this.publicationReactions;
    }
    else{
      return null;
    }
  }

  handleError(error:any){
    console.log(error);
  }

  getAll(){
    return this.publicationReactions;
  }

  isLiked(user_id:number):boolean{
    let react = this.publicationReactions.find((reactions)=>{
      return reactions.user_id==user_id;
    });
    return typeof react !=='undefined'
  }

  performLike(publication_id:number){
    if(this.userProvider.isAuthenticated()){
      let url = Params.getBaseUrl()+'/v1/publication/'+publication_id+'/react';
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.userProvider.getToken(),
      });
      return this.http.patch(url,{},{headers:headers});
    }
    return null;
  }

}
