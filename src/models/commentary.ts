

import {User} from "./user";

export class Commentary{

  private _id:number;
  private _commented_by:User;
  private _publication_id:number;
  private _content:string;
  private _commented_at:string;


  constructor(id: number, commented_by: User, publication_id: number, content: string, commented_at: string) {
    this._id = id;
    this._commented_by = commented_by;
    this._publication_id = publication_id;
    this._content = content;
    this._commented_at = commented_at;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get commented_by(): User {
    return this._commented_by;
  }

  set commented_by(value: User) {
    this._commented_by = value;
  }

  get publication_id(): number {
    return this._publication_id;
  }

  set publication_id(value: number) {
    this._publication_id = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get commented_at(): string {
    return this._commented_at;
  }

  set commented_at(value: string) {
    this._commented_at = value;
  }
}
