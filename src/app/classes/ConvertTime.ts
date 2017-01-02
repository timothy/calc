/**
 * Created by Timothy on 12/16/2016.
 */
import {Validate} from "./TimeValidator";

/**
 * Using this class to convert times will make it easier to change conversion formulas
 * changing the formaula here will change it every where it is used.
 */
export class ConvertTime {

 static readonly milliMin: number = 60 * 1000;
 static readonly milliHour: number = 60 * ConvertTime.milliMin;

  static HourMin2Dec(hours: number, min:number): number {
    hours = Validate.Integer(hours);
    min = Validate.Integer(min);
    return ((hours * this.milliHour) + (min * this.milliMin)) / this.milliHour;
  }

  static MiliSec2Dec(milliSec: number):number {//todo add validation
    return milliSec / this.milliHour;
  }

  static Dec2Hour(decimalTime: number): number {
    decimalTime = Validate.Decimal(decimalTime);
    return Math.floor(decimalTime);
  }

  static Dec2Min(decimalTime: number): number {//TODO round to the nearest whole number...
    decimalTime = Validate.Decimal(decimalTime);
    return Math.floor((decimalTime - Math.floor(decimalTime)) * 60);//might want to start rounding to nearest min instead of dropping remainder...

    //or maybe: return Math.floor(decimalTime * 60) % 60;
    //or maybe: return Math.floor(((decimalTime * this.milliHour) % this.milliHour)/this.milliMin);
  }
}
