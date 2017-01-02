import {Component} from '@angular/core';
import {DayTimeTracker, TotalTime} from "./types";
import {Validate} from "./classes/TimeValidator";// no longer needed -- this is now happening as part of the convert time class
import {ConvertTime} from "./classes/ConvertTime";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly DOW: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  readonly week: number = 7;
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
    //clear start and end times... does not make sense to keep them user manually inputs time amount
    this.days[index].endDate = null;
    this.days[index].startDate = null;

    this.days[index].decimalTime = Validate.Decimal(this.days[index].decimalTime);

    //convert decimal to hour min
    this.days[index].hours = ConvertTime.Dec2Hour(this.days[index].decimalTime);
    this.days[index].min = ConvertTime.Dec2Min(this.days[index].decimalTime);

    //Calculate end totals with new subtracted amount
    this.calcEndTotals(index);
  }

  /**
   * This will calculate decimal time and hr/min time based on hr/min input
   */
  CalcTime(index) {
    //clear start and end times... does not make sense to keep them user manually inputs time amount
    this.days[index].endDate = null;
    this.days[index].startDate = null;

    //convert hour min to decimal
    this.days[index].decimalTime = ConvertTime.HourMin2Dec(this.days[index].hours, this.days[index].min);
    //((this.days[index].hours * this.milliHour) + (this.days[index].min * this.milliMin)) / this.milliHour;

    //convert hours and min to resolve a fraction/over 60min case in hours or min
    this.days[index].hours = ConvertTime.Dec2Hour(this.days[index].decimalTime);
    this.days[index].min = ConvertTime.Dec2Min(this.days[index].decimalTime);

    //Calculate end totals with new subtracted amount
    this.calcEndTotals(index);
  }


  //TODO finish to/from time calculation
  calcStartEndTime(index) {
    //make sure there is information in both "start" and "end" sections before trying to work with it.
    if(this.days[index].endDate && this.days[index].startDate && this.days[index].endDate.getTime() > this.days[index].startDate.getTime()){

      //find out how many milliseconds are between start and end times
      let result:number = this.days[index].endDate.getTime() - this.days[index].startDate.getTime();

      //update all other fields - based on new start and end times
      this.days[index].decimalTime = ConvertTime.MiliSec2Dec(result);
      this.days[index].hours = ConvertTime.Dec2Hour(this.days[index].decimalTime);
      this.days[index].min = ConvertTime.Dec2Min(this.days[index].decimalTime);

      this.calcEndTotals(index);
    }
  }


  /**
   * Calculate end totals. If there is a previous amount then overwrite it with new amount
   * @param index the index of the day array that is to be edited
   */
  calcEndTotals(index){
    if (this.oldTime[index]) {
      this.time.decimal += this.oldTime[index];
      this.time.hours = ConvertTime.Dec2Hour(this.time.decimal);
      this.time.min = ConvertTime.Dec2Min(this.time.decimal);
    }
    this.time.decimal -= this.days[index].decimalTime;
    this.time.hours = ConvertTime.Dec2Hour(this.time.decimal);
    this.time.min = ConvertTime.Dec2Min(this.time.decimal);

    this.oldTime[index] = this.days[index].decimalTime;
  }

}
