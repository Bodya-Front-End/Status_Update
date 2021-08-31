import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

// this interface for get request
export interface Response {
  status: string
}

// this interface for create request object
export interface LogData {
  date: Date;
  url: string;
  result: string;
}
// this enum for add color text
export enum ResponseStatus {
  SUCCESS = 'Success',
  PENDING = 'Pending',
}

@Injectable({
  providedIn: 'root'
})
export class SendRequestService {
  // create Headers for request
  private readonly headers = new HttpHeaders({
    'x-api-key': 'syaNs11gHB9pev48g5Zrt5p5O4cKX7yU1bUDj7F5'
  });

  private readonly url: string;
  constructor(private http: HttpClient) {
    //initialize URL
    this.url = 'https://c5ljdx2w0m.execute-api.eu-central-1.amazonaws.com/recruitment/'
  }

  public getStatus(): Observable<LogData> {
    //submitting a request
    return this.http.get<Response>(this.url, {headers: this.headers})
      //modify the answer for the table
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
