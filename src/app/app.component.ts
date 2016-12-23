import {Component} from '@angular/core';
import {DayTimeTracker, TotalTime} from "./types";
//import {Validate} from "./classes/TimeValidator"; no longer needed -- this is now happening as part of the convert time class
import {ConvertTime} from "./classes/ConvertTime";

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
    //dirty check and clean numbers// no longer needed...
    /*    this.days[index].decimalTime = Validate.Decimal(this.days[index].decimalTime);
     this.days[index].hours = Validate.Integer(this.days[index].hours);
     this.days[index].min = Validate.Integer(this.days[index].min);*/

    //if old time then subtract and add new time.
    this.timeCheck(index);

    //convert decimal to hour min
    this.days[index].hours = ConvertTime.Dec2Hour(this.days[index].decimalTime);
    this.days[index].min = ConvertTime.Dec2Min(this.days[index].decimalTime);

    //Calculate end totals with new subtracted amount
    this.time.decimal -= this.days[index].decimalTime;//todo find out why totals == NaN
    this.time.hours = ConvertTime.Dec2Hour(this.time.decimal);
    this.time.min = ConvertTime.Dec2Min(this.time.decimal);//ToDO change other min convertion

    //need to save state to reference in order to avoid looping over all calculations each time
    this.oldTime[index] = this.days[index].decimalTime;
  }

  /**
   * This will calculate decimal time and hr/min time based on hr/min input
   */
  CalcTime(index) {
    //dirty check and clean numbers//this is now done as part of the number conversion
    // this.days[index].decimalTime = Validate.Decimal(this.days[index].decimalTime);
    // this.days[index].hours = Validate.Integer(this.days[index].hours);
    // this.days[index].min = Validate.Integer(this.days[index].min);

    //if old time then subtract and add new time.
    this.timeCheck(index);

    //convert hour min to decimal
    this.days[index].decimalTime = ConvertTime.HourMin2Dec(this.days[index].hours, this.days[index].min);
    //((this.days[index].hours * this.milliHour) + (this.days[index].min * this.milliMin)) / this.milliHour;

    //convert hours and min to resolve a fraction/over 60min case in hours or min
    this.days[index].hours = ConvertTime.Dec2Hour(this.days[index].decimalTime);
    this.days[index].min = ConvertTime.Dec2Min(this.days[index].decimalTime);

    //Calculate end totals with new subtracted amount
    this.time.decimal -= this.days[index].decimalTime;
    this.time.hours = ConvertTime.Dec2Hour(this.time.decimal);
    this.time.min = ConvertTime.Dec2Min(this.time.decimal);

    //need to save state to reference in order to avoid looping over all calculations each time
    this.oldTime[index] = this.days[index].decimalTime;
  }


  //TODO finish to/from time calculation
  calcToFromTime(index) {
     //if old time then subtract and add new time.
    this.timeCheck(index);

    this.days[index].decimalTime = ((this.days[index].hours * this.milliHour) + (this.days[index].min * this.milliMin)) / this.milliHour;

    this.time.decimal -= this.days[index].decimalTime;
    this.time.hours = Math.floor(this.time.decimal);
    this.time.min = Math.floor(this.time.decimal * 60) % 60;

    this.oldTime[index] = this.days[index].decimalTime;
  }

  timeCheck(index) {
    if (this.oldTime[index]) {
      this.time.decimal += this.oldTime[index];
      this.time.hours = Math.floor(this.time.decimal);
      this.time.min = Math.floor(this.time.decimal * 60) % 60;
    }
  }

}
