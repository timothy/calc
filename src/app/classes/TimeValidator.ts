/**
 * Created by ^_^ on 12/15/2016.
 */

export class Validate {

  /**
   * try to strip out all non-numeric characters wile leaving in '.'
   * if that does not work return 0
   * @param checkItem a potential number
   * @returns {number}
   */
  static Decimal(checkItem: any): number {
    if (isNaN(checkItem)) {
      if (isNaN(parseFloat(checkItem.toString().replace(/[^0-9.]/g, '')))) {
        return 0;
      } else {
        return parseFloat(checkItem.toString().replace(/[^0-9.]/g, ''));
      }
    }else {
      return parseFloat(checkItem);
    }
  }

  /**
   * try to strip out all non-numeric characters
   * if that does not work return 0
   * @param checkItem a potential number
   * @returns {number}
   */
  static Hour(checkItem: any): number {
    if (isNaN(checkItem)) {
      if (isNaN(parseInt(checkItem.toString().replace(/\D/g, '')))) {
        return 0;
      } else {
        return parseInt(checkItem.toString().replace(/\D/g, ''));
      }
    } else {
      return parseInt(checkItem);
    }
  }

  //this is an overload of hours
  static Min(checkItem: any): number {
    return Validate.Hour(checkItem);
  }

}
