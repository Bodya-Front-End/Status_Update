import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


export interface Response {
  status: string
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

  public getStatus(): Observable<Response> {

    return this.http.get<Response>(this.url, {headers: this.headers})
  }
}
