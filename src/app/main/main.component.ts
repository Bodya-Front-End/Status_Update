import {Component, OnDestroy, OnInit} from '@angular/core';
import {Response, SendRequestService} from "../services/send-request.service";
import {finalize, takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public loading = false;
  // public gotAnAnswer = false;
  public gotAnAnswer = true;
  public answer: Response;
  private destroy$ = new Subject();

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
      })
  }
}
