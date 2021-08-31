import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


export interface Response {
  status: string
}
export interface LogData {
  date: Date;
  url: string;
  result: string;
}

export enum ResponseStatus {
  SUCCESS = 'Success',
  PENDING = 'Pending',
}

@Injectable({
  providedIn: 'root'
})
export class SendRequestService {
  private readonly headers = new HttpHeaders({
    'x-api-key': 'syaNs11gHB9pev48g5Zrt5p5O4cKX7yU1bUDj7F5'
  });

  private readonly url: string;
  constructor(private http: HttpClient) {
    this.url = 'https://c5ljdx2w0m.execute-api.eu-central-1.amazonaws.com/recruitment/'
  }

  public getStatus(): Observable<LogData> {

    return this.http.get<Response>(this.url, {headers: this.headers})
      .pipe(
        map((res) => {
          return {
            date: new Date(),
            url: this.url,
            result: res.status,
          }
        })
      )
  }
}
