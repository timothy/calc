import {Component} from '@angular/core';
import {DayTimeTracker, TotalTime} from "./types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly DOW: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  readonly week: number = 7;
  readonly milliMin: number = 60 * 1000;
  readonly milliHour: number = 60 * this.milliMin;
  readonly totalTime: number = 40;// this is total time in millisecond

  //---used in the view---
  days: Array<DayTimeTracker> = [];
  time: TotalTime = {decimal: 40, hours: 40, min: 0};

  constructor() {
    for (let i = 0; i < this.week; i++) {
      this.days.push({day: this.DOW[i], hours: 0, min: 0, decimalTime: 0, overflow: 0});
    }
  }

  calcDecTime() {
    let dTime: number = this.totalTime;
    let hrTime: number = this.totalTime * this.milliHour;

    for (let c = 0; c < this.week; c++) {
      dTime -= this.days[c].decimalTime;

      this.days[c].hours = Math.floor(this.days[c].decimalTime);
      this.days[c].min = Math.floor(this.days[c].decimalTime * 60) % 60;
      hrTime -= this.days[c].hours * this.milliHour;
      hrTime -= this.days[c].min * this.milliMin;
    }
    this.time.decimal = dTime;
    this.time.hours = Math.floor(hrTime / this.milliHour);
    this.time.min = Math.floor((hrTime % this.milliHour) / this.milliMin);
  }

  CalcTime() {
    let dTime: number = this.totalTime;
    let hrTime: number = this.totalTime * this.milliHour;

    for (let c = 0; c < this.week; c++) {
      this.days[c].decimalTime = ((this.days[c].hours * this.milliHour) + (this.days[c].min * this.milliMin)) / this.milliHour;
      hrTime -= this.days[c].hours * this.milliHour;
      hrTime -= this.days[c].min * this.milliMin;
      dTime -= this.days[c].decimalTime;
    }

    this.time = {
      hours: Math.floor(hrTime / this.milliHour),
      min: Math.floor((hrTime % this.milliHour) / this.milliMin),
      decimal: dTime
    };
  }

}
