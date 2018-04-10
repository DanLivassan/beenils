import {Editorial} from "./editorial";
import {Address} from "./address";
import {Params} from "../utils/params";

export class User{

  // User attributes
  private _id:number;
  private _name:string;
  private _last_name:string;
  private _type:number;
  private _status:number;
  private _editorials:Editorial[];
  private _column:string;
  private _address:Address;

  // User Profile attributes
  private _email:string;
  private _picture:string;
  private _phone_number:string;
  private _points:number;
  private _about:string;


  //UserToken
  private _user_token:string;


  static readonly UserStatus = {
    'ativo':1,
    'inativo': 2,
  };


  constructor(id: number, name: string, last_name: string, type: number, status: number) {
    this._id = id;
    this._name = name;
    this._last_name = last_name;
    this._type = type;
    this._status = status;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get last_name() {
    return this._last_name;
  }

  set last_name(value) {
    this._last_name = value;
  }

  get_full_name():string{
    return this.name +' '+ this.last_name;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get editorials() {
    return this._editorials;
  }

  set editorials(value) {
    this._editorials = value;
  }

  setEditorial(value:Editorial){
    this._editorials.push(value);
  }

  get column() {
    return this._column;
  }

  set column(value) {
    this._column = value;
  }

  get email() {
    return this._email;
  }

  set email(value) {
    this._email = value;
  }

  get picture() {
    return this._picture;
  }

  set picture(value) {
    this._picture = value;
  }

  get phone_number() {
    return this._phone_number;
  }

  set phone_number(value) {
    this._phone_number = value;
  }


  get user_token() {
    return this._user_token;
  }

  set user_token(value) {
    this._user_token = value;
  }

  get address(): Address {
    return this._address;
  }

  set address(value: Address) {
    this._address = value;
  }

  public is(group:string):boolean{
    return Params.UserTypes[group]==this.type;
  }


  get points(): number {
    return this._points;
  }

  set points(value: number) {
    this._points = value;
  }


  get about(): string {
    return this._about;
  }

  set about(value: string) {
    this._about = value;
  }
}
