/**
 * Created by ^_^ on 12/7/2016.
 */
interface TotalTime {
  decimal: number;
  hours: number;
  min: number;
  fromDate?: Date;
  toDate?: Date;
}

interface DayTimeTracker {
  day: string;
  hours: number;
  min: number;
  decimalTime: number;
}
export {TotalTime, DayTimeTracker}
