import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy{
  public text: string;
  public delay: number = 5000;
  public type: string = 'success';

  aSub: Subscription

  constructor(
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.aSub = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text;
      this.type = alert.type;

      setTimeout(() => {
        this.text = ''
      }, this.delay)
    })
  }

  ngOnDestroy(): void {
    if(this.aSub) {
      this.aSub.unsubscribe()
    }
  }
}
