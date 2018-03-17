import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Editorial} from "../../models/editorial";
import {Params} from "../../utils/params";
import {UserProvider} from "../user/user";

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
    this.editorials.push(
      new Editorial(1,'Esportes'),
      new Editorial(2,'Política'),
      new Editorial(3,'Saúde')
    );
  }

  getAll():Editorial[]{


    return this.editorials;

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

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+this.userProvider.getToken(),
        })
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
