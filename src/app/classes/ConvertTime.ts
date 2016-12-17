/**
 * Created by ^_^ on 12/16/2016.
 */
import {Validate} from "./TimeValidator";
export class ConvertTime {//TODO add time conversions and add to project

 static readonly milliMin: number = 60 * 1000;
 static readonly milliHour: number = 60 * ConvertTime.milliMin;

  static HourMin2Dec(hours: number, min:number): number {
    hours = Validate.Integer(hours);
    min = Validate.Integer(min);
    return ((hours * this.milliHour) + (min * this.milliMin)) / this.milliHour;
  }

  static Dec2Hour(decimalTime: number): number {
    decimalTime = Validate.Decimal(decimalTime);
    return Math.floor(decimalTime);
  }

  static Dec2Min(decimalTime: number): number {//TODO round to the nearest whole number...
    decimalTime = Validate.Decimal(decimalTime);
    return Math.floor((decimalTime - Math.floor(decimalTime)) * 60);

    //or maybe: return Math.floor(decimalTime * 60) % 60;
    //or maybe: return Math.floor(((decimalTime * this.milliHour) % this.milliHour)/this.milliMin);
  }
}
