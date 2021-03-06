import {Component} from '@angular/core';
import {DayTimeTracker, TotalTime} from './types';
import {NumValidator as Validate} from './classes/num-validator';
import {ConvertTime} from './classes/convert-time';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly DOW: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  readonly week = 7;
  oldTime: number[] = [];

  // ---variables below are used in the view---
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
   * and will update all other field to reflect this new time
   */
  calcDecTime(index) {
    const decTime: string = this.days[index].decimalTime.toString();
    if (!(decTime[decTime.length - 1] === '.' && decTime.split('.').length - 1 <= 1) && !(decTime[decTime.length - 1] === '0')) {
      // clear start and end times... does not make sense to keep them user manually inputs time amount
      this.days[index].endDate = null;
      this.days[index].startDate = null;

      this.days[index].decimalTime = Validate.Decimal(this.days[index].decimalTime);

      // convert decimal to hour min
      this.days[index].hours = ConvertTime.Dec2Hour(this.days[index].decimalTime);
      this.days[index].min = ConvertTime.Dec2Min(this.days[index].decimalTime);

      // Calculate end totals with new subtracted amount
      this.calcEndTotals(index);
    }
  }

  /**
   * This will calculate decimal time and hr/min time based on hr/min input
   * and will update all other field to reflect this new time
   * @param index the index of the day array that is to be edited
   */
  CalcTime(index) {
    // clear start and end times... does not make sense to keep them user manually inputs time amount
    this.days[index].endDate = null;
    this.days[index].startDate = null;

    // convert hour min to decimal
    this.days[index].decimalTime = ConvertTime.HourMin2Dec(this.days[index].hours, this.days[index].min);
    // ((this.days[index].hours * this.milliHour) + (this.days[index].min * this.milliMin)) / this.milliHour;

    // convert hours and min to resolve a fraction/over 60min case in hours or min
    this.days[index].hours = ConvertTime.Dec2Hour(this.days[index].decimalTime);
    this.days[index].min = ConvertTime.Dec2Min(this.days[index].decimalTime);

    // Calculate end totals with new subtracted amount
    this.calcEndTotals(index);
  }

  /**
   * This will calculate the amount of time between the start and end time boxes
   * and will update all other field to reflect this new time
   * @param index the index of the day array that is to be edited
   */
  calcStartEndTime(index) {
    // make sure there is information in both "start" and "end" sections before trying to work with it.
    if (this.days[index].endDate && this.days[index].startDate &&
      this.days[index].endDate.getTime() > this.days[index].startDate.getTime()) {

      // find out how many milliseconds are between start and end times
      const result: number = this.days[index].endDate.getTime() - this.days[index].startDate.getTime();

      // update all other fields - based on new start and end times
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
  calcEndTotals(index) {
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
