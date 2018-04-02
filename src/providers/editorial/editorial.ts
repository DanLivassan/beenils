import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Editorial} from "../../models/editorial";
import {Params} from "../../utils/params";
import {UserProvider} from "../user/user";
import {Observable} from "rxjs/Observable";
import 'rxjs';
/*
  Generated class for the EditorialProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EditorialProvider {

  private editorials:Editorial[]=[];
  constructor(
    private http:HttpClient,
    private userProvider:UserProvider
  ) {
    /*this.editorials.push(
      new Editorial(1,'Esportes'),
      new Editorial(2,'Política'),
      new Editorial(3,'Saúde')
    );*/
  }

  getAll():Editorial[]{
    return this.editorials;
  }

  refreshData() {
    if (this.userProvider.isAuthenticated()) {
      let url = Params.getBaseUrl() + '/v1/editorial/all';
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.userProvider.getToken(),
      });
      let params = new HttpParams();
      params = params.set('limit','50');
      const httpOptions = {
        headers: headers,
        params: params
      };
      return this.http.get(url, httpOptions);
    }
    else{
      return null;
    }
  }

  extractData(data){
    if (data) {
      this.editorials = [];
      data.forEach((edt) => {
        this.editorials.push(new Editorial(edt['id'], edt['name']));
      });
      return this.editorials;
    }
  }
  get(id:number):Editorial{
    let editorial = this.editorials.filter(ed=>ed.id===id)[0];
    if(typeof editorial === 'undefined'){
      return null;
    }
    return editorial;
  }

  set(editorial: Editorial){
    if(this.userProvider.isAuthenticated()) {

      let headers = new HttpHeaders({
        'Authorization': 'Bearer '+this.userProvider.getToken(),
      });

      const httpOptions = {
        headers:headers
      };

      let url = Params.getBaseUrl() + '/v1/editorial/create';
      let formData: FormData = new FormData();
      formData.append('Editorial[name]', editorial.name);
      this.http.post(
        url,
        formData,
        httpOptions
      ).subscribe((edt)=>{
        console.log("subcribe ----------");
        console.log(edt);
      });


    }
  }



}
