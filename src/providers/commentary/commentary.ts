import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Commentary} from "../../models/commentary";
import {UserProvider} from "../user/user";
import {Params} from "../../utils/params";
import {Observable} from "rxjs/Observable";
import * as moment from "moment";
import "moment-timezone";



@Injectable()
export class CommentaryProvider {

  commentaries:Commentary[]=[];

  constructor(
    public http: HttpClient,
    public userProvider:UserProvider
  ) {

  }

  refreshPublicationData(publicationId:number):Observable<Object>{
    let url = Params.getBaseUrl()+'/v1/publication/commentaries/'+publicationId;
    let params = new HttpParams();
    params = params.set('publicationId', publicationId.toString());
    return this.http.get(url);
  }

  extractData(data:Array<any>){
    data.forEach((comment)=>{
      this.commentaries.push(new Commentary(
        comment.id,
        this.userProvider.formatUser(comment.commented_by),
        comment.publication,
        comment.commentary,
        moment(comment.commented_at).tz('America/Sao_paulo').format()
        ));
    });
  }

  getAll():Commentary[]{
    return this.commentaries;
  }

  handleError(error:any){
    console.error(error);
  }

  performComment(publicationId:number, content:string){
    if(this.userProvider.isAuthenticated()){
      let url = Params.getBaseUrl()+'/v1/publication/'+publicationId+'/commentary/create';
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.userProvider.getToken(),
      });
      let form_data:FormData=new FormData();
      form_data.append('PublicationCommentary[commentary]',content);
      return this.http.post(url,form_data,{headers:headers});
    }
  }

  approveComment(commentId:number, publicationId:number){
    if(this.userProvider.isAuthenticated() && (this.userProvider.getUser().is('editor')||this.userProvider.getUser().is('moderador'))){
      let url = Params.getBaseUrl()+'/v1/publication/'+publicationId+'/commentary/'+commentId+'/approve';
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.userProvider.getToken(),
      });
      return this.http.patch(url,{},{headers:headers});
    }
    return null;
  }

  getPendingComments(){
    if(this.userProvider.isAuthenticated() && (this.userProvider.getUser().is('editor')||this.userProvider.getUser().is('moderador'))){
      let url = Params.getBaseUrl()+'/v1/commentary/all-pending';
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.userProvider.getToken(),
      });
      return this.http.get(url,{headers:headers});
    }
    return null;
  }

}
