import {Component, OnDestroy, OnInit} from '@angular/core';
import {LogData, ResponseStatus, SendRequestService} from "../services/send-request.service";
import {finalize, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public loading = false;
  public gotAnAnswer = false;
  // create Enum for change color text
  public responseStatus = ResponseStatus;
  public answer: LogData;
  private destroy$ = new Subject();

  // variables for table
  public displayedColumns: string[] = ['date', 'url', 'result'];
  public dataSourceTable = new MatTableDataSource();
  private logs  = [];


  constructor(private sendRequestService: SendRequestService) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    //unsubscribe for all subscriptions
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public sendRequest() {
    // turn on spinner
    this.loading = true
    this.sendRequestService.getStatus()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          // turn off spinner
          this.loading = false
          // variable for show right card
          this.gotAnAnswer = true;
        })
      )
      .subscribe(res => {
        //variable for data right card
        this.answer = res;
        //update the data for the table
        this.logs.push(res)
        this.dataSourceTable.data = this.logs
      })
  }
}
