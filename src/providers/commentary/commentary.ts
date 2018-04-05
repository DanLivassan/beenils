import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Commentary} from "../../models/commentary";
import {UserProvider} from "../user/user";
import {Params} from "../../utils/params";
import {Observable} from "rxjs/Observable";


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
        comment.commented_at
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

}
