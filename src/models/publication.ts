import {Editorial} from "./editorial";
import {User} from "./user";
import {PublicationCommentary} from "./publication-commentary";

export class Publication{
  private _id:number;
  private _title:string;
  private _content:string;
  private _created_at:string;
  private _created_by:User;
  private _status:number;
  private _editorial:Editorial;
  private _type:number;
  private _exclusive:number;
  private _scope:number;
  private _cover_image:string;
  private _views:number;
  private _city:string;
  private _publicationCommentary:PublicationCommentary[];

  static readonly NewsStatus = {
    'pendente':'1',
    'aprovada': '2',
  };


  constructor(
    id: number,
    title: string,
    content: string,
    created_at: string,
    created_by: User,
    status: number,
    editorial: Editorial,
    type: number,
    exclusive: number,
    scope: number,
    cover_image: string,
    views: number,
    city: string,
    publicationCommentary: PublicationCommentary[]
  ) {
      this._id = id;
      this._title = title;
      this._content = content;
      this._created_at = created_at;
      this._created_by = created_by;
      this._status = status;
      this._editorial = editorial;
      this._type = type;
      this._exclusive = exclusive;
      this._scope = scope;
      this._cover_image = cover_image;
      this._views = views;
      this._city = city;
      this._publicationCommentary = publicationCommentary;
  }


  get id(): number {
    return this._id;
  }


  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get created_at(): string {
    return this._created_at;
  }

  set created_at(value: string) {
    this._created_at = value;
  }

  get created_by(): User {
    return this._created_by;
  }

  set created_by(value: User) {
    this._created_by = value;
  }

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }

  get editorial(): Editorial {
    return this._editorial;
  }

  set editorial(value: Editorial) {
    this._editorial = value;
  }

  get type(): number {
    return this._type;
  }

  set type(value: number) {
    this._type = value;
  }

  get exclusive(): number {
    return this._exclusive;
  }

  set exclusive(value: number) {
    this._exclusive = value;
  }

  get scope(): number {
    return this._scope;
  }

  set scope(value: number) {
    this._scope = value;
  }

  get cover_image(): string {
    return this._cover_image;
  }

  set cover_image(value: string) {
    this._cover_image = value;
  }

  get views(): number {
    return this._views;
  }

  set views(value: number) {
    this._views = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

}
