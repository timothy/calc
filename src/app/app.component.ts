import {Component} from '@angular/core';
import {} from ''
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
   btnActive: Object = {decimal: '', min: 'active'};
   time: TotalTime = {decimal: 40, hours: 40, min: 0};
   calcType: string = 'min';//or decimal

  constructor() {
    for (let i = 0; i < this.week; i++) {
      this.days.push({day: this.DOW[i], hours: 0, min: 0, decimalTime: 0,overflow:0});
    }
  }

  /**
   * this will calculate the remaining time based on current user input
   */
  calcTime() {
    let hrTime: number =this.totalTime * this.milliHour;
    let dTime: number = this.totalTime;

    for (let c = 0; c < this.week; c++) {
      dTime -= this.days[c].decimalTime;
      hrTime -= this.days[c].hours * this.milliHour;
      hrTime -= this.days[c].min * this.milliMin;
    }

   // hrTime = dTime * this.milliHour;

  this.time = {
    decimal: dTime,
    hours: Math.floor(hrTime / this.milliHour),
    min: Math.floor((hrTime % this.milliHour) / this.milliMin)
  };

  }

  /**
   * this will change the type of calculation to be displayed
   * @param newVal:string == the new type of calculation
   */
  changeCalc(newVal:string) {
    //set btn active
    this.calcType = newVal;

    this.mergeTime();

    for (let prop in this.btnActive) {
      this.btnActive[prop] = '';
    }
    this.btnActive[newVal] = 'active';
  }

  /**
   * This will merge decimal time and regular time together.
   */
  mergeTime(){
    if(this.calcType === 'min'){
      let hrTime: number = this.totalTime * this.milliHour;
      for (let c = 0; c < this.week; c++) {
        this.days[c].overflow = this.days[c].decimalTime;
        this.days[c].hours = Math.floor(this.days[c].decimalTime);
        this.days[c].min = Math.floor(this.days[c].decimalTime*60)%60;
        hrTime -= this.days[c].hours * this.milliHour;
        hrTime -= this.days[c].min * this.milliMin;
      }
      this.time.hours = Math.floor(hrTime / this.milliHour);
      this.time.min = Math.floor((hrTime % this.milliHour) / this.milliMin);

    }else if (this.calcType === 'decimal'){
      let dTime: number = this.totalTime;

      for (let c = 0; c < this.week; c++) {
        if(this.days[c].overflow){
          this.days[c].decimalTime = this.days[c].overflow
        } else{
          this.days[c].decimalTime = ((this.days[c].hours * this.milliHour)+(this.days[c].min * this.milliMin)) / this.milliHour;
        }
        dTime -= this.days[c].decimalTime;
      }
      this.time.decimal = dTime;
    }
  }

}
