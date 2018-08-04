import {Movie} from "./movie";
import {CineRoom} from "./cine-room";

export class CineSchedule{


  private _id:number;
  private _movie:Movie;
  private _room:CineRoom;
  private _displayed_at:string;
  private _schedule_tags:Array<string>;


  constructor(movie: Movie, room: CineRoom, displayed_at: string) {
    this._movie = movie;
    this._room = room;
    this._displayed_at = displayed_at;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get movie(): Movie {
    return this._movie;
  }

  set movie(value: Movie) {
    this._movie = value;
  }

  get room(): CineRoom {
    return this._room;
  }

  set room(value: CineRoom) {
    this._room = value;
  }

  get displayed_at(): string {
    return this._displayed_at;
  }

  set displayed_at(value: string) {
    this._displayed_at = value;
  }

  get schedule_tags(): Array<string> {
    return this._schedule_tags;
  }

  set schedule_tags(value: Array<string>) {
    this._schedule_tags = value;
  }
}
