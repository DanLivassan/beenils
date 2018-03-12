import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Editorial} from "../../models/editorial";

/*
  Generated class for the EditorialProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EditorialProvider {

  private editorials:Editorial[]=[];
  constructor(private http:HttpClient) {
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

  set(editorial: Editorial):Editorial{
    this.editorials.push(editorial);
    return editorial;
  }



}
