import {MovieGenre} from "./movie-genre";

export class Movie{

  private _id:number;
  private _censorship:number;
  private _duration:number;
  private _original_title:string;
  private _title:string;
  private _picture:string;
  private _media:string;
  private _synopsis:string;
  private _nationality:string;
  private _idiom:string;
  private _site:string;
  private _released_at:string;
  private _created_at:string;
  private _is_national:boolean;
  private _genres:Array<MovieGenre>;



  constructor(original_title: string, idiom: string, created_at: string, is_national: boolean) {
    this._original_title = original_title;
    this._idiom = idiom;
    this._created_at = created_at;
    this._is_national = is_national;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get censorship(): number {
    return this._censorship;
  }

  set censorship(value: number) {
    this._censorship = value;
  }

  get duration(): number {
    return this._duration;
  }

  set duration(value: number) {
    this._duration = value;
  }

  get original_title(): string {
    return this._original_title;
  }

  set original_title(value: string) {
    this._original_title = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get picture(): string {
    return this._picture;
  }

  set picture(value: string) {
    this._picture = value;
  }

  get media(): string {
    return this._media;
  }

  set media(value: string) {
    this._media = value;
  }

  get synopsis(): string {
    return this._synopsis;
  }

  set synopsis(value: string) {
    this._synopsis = value;
  }

  get nationality(): string {
    return this._nationality;
  }

  set nationality(value: string) {
    this._nationality = value;
  }

  get idiom(): string {
    return this._idiom;
  }

  set idiom(value: string) {
    this._idiom = value;
  }

  get site(): string {
    return this._site;
  }

  set site(value: string) {
    this._site = value;
  }

  get released_at(): string {
    return this._released_at;
  }

  set released_at(value: string) {
    this._released_at = value;
  }

  get created_at(): string {
    return this._created_at;
  }

  set created_at(value: string) {
    this._created_at = value;
  }

  get is_national(): boolean {
    return this._is_national;
  }

  set is_national(value: boolean) {
    this._is_national = value;
  }


  get genres(): Array<MovieGenre> {
    return this._genres;
  }

  set genres(value: Array<MovieGenre>) {
    this._genres = value;
  }

  
}
