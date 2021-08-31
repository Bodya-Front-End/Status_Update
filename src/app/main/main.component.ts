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
  public gotAnAnswer = true;
  public responseStatus = ResponseStatus;
  public answer: LogData;
  private destroy$ = new Subject();
  public displayedColumns: string[] = ['date', 'url', 'result'];
  private logs  = [];
  public dataSourceTable = new MatTableDataSource();


  constructor(private sendRequestService: SendRequestService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public sendRequest() {
    this.loading = true
    this.sendRequestService.getStatus()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false
          this.gotAnAnswer = true;
        })
      )
      .subscribe(res => {
        this.answer = res;
        this.logs.push(res)
        this.dataSourceTable.data = this.logs
      })
  }
}
