import {Component} from '@angular/core';
import {DayTimeTracker, TotalTime} from "./types";
import {Validate} from "./classes/TimeValidator";

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
  readonly totalTime: number = 40;// this is total hour amount of time for the entire week
  oldTime: number[] = [];

  //---used in the view---
  readonly startTimeOpts = {
    minuteStep: 1,
    showMeridian: true,
    template: 'dropdown',
    showInputs: false,
    placeholder: 'Start Time'
  };
  readonly endTimeOpts = {
    minuteStep: 1,
    showMeridian: true,
    template: 'dropdown',
    showInputs: true,
    placeholder: 'End Time'
  };
  days: Array<DayTimeTracker> = [];
  time: TotalTime = {decimal: 40, hours: 40, min: 0};

  constructor() {
    for (let i = 0; i < this.week; i++) {
      this.days.push({day: this.DOW[i], hours: 0, min: 0, decimalTime: 0, index: i});
      this.oldTime.push(0);
    }
  }

  /**
   * This will calculate decimal time and hr/min time based on decimal input
   */
  calcDecTime(index) {
    //dirty check and clean numbers
    this.days[index].decimalTime = Validate.Decimal(this.days[index].decimalTime);
    this.days[index].hours = Validate.Hour(this.days[index].hours);
    this.days[index].min = Validate.Min(this.days[index].min);

    //if input value changes, old input value should be added to total before new value is subtracted from total
    if (this.oldTime[index]) {
      this.time.decimal += this.oldTime[index];
      this.time.hours = Math.floor(this.time.decimal);
      this.time.min = Math.floor(this.time.decimal * 60) % 60;
    }

    //convert decimal to hour min
    this.days[index].hours = Math.floor(this.days[index].decimalTime);
    this.days[index].min = Math.floor(this.days[index].decimalTime * 60) % 60;

    //Calculate end totals with new subtracted amount
    this.time.decimal -= this.days[index].decimalTime;//todo find out why totals == NaN
    this.time.hours = Math.floor(this.time.decimal);
    this.time.min = Math.floor(this.time.decimal * 60) % 60;

    //need to save state to reference in order to avoid looping over all calculations each time
    this.oldTime[index] = this.days[index].decimalTime;
  }

  /**
   * This will calculate decimal time and hr/min time based on hr/min input
   */
  CalcTime(index) {
    //dirty check and clean numbers
    this.days[index].decimalTime = Validate.Decimal(this.days[index].decimalTime);
    this.days[index].hours = Validate.Hour(this.days[index].hours);
    this.days[index].min = Validate.Min(this.days[index].min);

    //if input value changes, old input value should be added to total before new value is subtracted from total
    if (this.oldTime[index]) {
      this.time.decimal += this.oldTime[index];
      this.time.hours = Math.floor(this.time.decimal);
      this.time.min = Math.floor(this.time.decimal * 60) % 60;
    }

    //convert hour min to decimal
    this.days[index].decimalTime = ((this.days[index].hours * this.milliHour) + (this.days[index].min * this.milliMin)) / this.milliHour;

    //convert hours and min to resolve a fraction/over 60min case in hours or min
    this.days[index].hours = Math.floor(this.days[index].decimalTime);
    this.days[index].min = Math.floor(this.days[index].decimalTime * 60) % 60;

    //Calculate end totals with new subtracted amount
    this.time.decimal -= this.days[index].decimalTime;
    this.time.hours = Math.floor(this.time.decimal);
    this.time.min = Math.floor(this.time.decimal * 60) % 60;

    //need to save state to reference in order to avoid looping over all calculations each time
    this.oldTime[index] = this.days[index].decimalTime;
  }


  //TODO finish to/from time calculation
  calcToFromTime(index) {

    if (this.oldTime[index]) {
      this.time.decimal += this.oldTime[index];
      this.time.hours = Math.floor(this.time.decimal);
      this.time.min = Math.floor(this.time.decimal * 60) % 60;
    }

    this.days[index].decimalTime = ((this.days[index].hours * this.milliHour) + (this.days[index].min * this.milliMin)) / this.milliHour;

    this.time.decimal -= this.days[index].decimalTime;
    this.time.hours = Math.floor(this.time.decimal);
    this.time.min = Math.floor(this.time.decimal * 60) % 60;

    this.oldTime[index] = this.days[index].decimalTime;
  }

  numberValidator(index: number) {


  }

}
