export class NumValidator {
  /**
   * try to strip out all non-numeric characters wile leaving in '.'
   * if that does not return a valid float than return 0
   * @param checkItem a potential number
   * @returns {number}
   */
  static Decimal(checkItem: any): number {
    if (isNaN(checkItem) || !parseFloat(checkItem)) {
      if (isNaN(parseFloat(checkItem.toString().replace(/[^0-9.]/g, ''))) || !parseFloat(checkItem.toString().replace(/[^0-9.]/g, ''))) {
        return 0;
      } else {
        return parseFloat(checkItem.toString().replace(/[^0-9.]/g, ''));
      }
    } else {
      return parseFloat(checkItem);
    }
  }

  /**
   * try to strip out all non-numeric characters
   * if that does not return an integer than return 0
   * @param checkItem a potential number
   * @returns {number}
   */
  static Integer(checkItem: any): number {
    if (isNaN(checkItem) || !parseInt(checkItem, 10)) {
      if (isNaN(parseInt(checkItem.toString().replace(/\D/g, ''), 10)) || !parseInt(checkItem.toString().replace(/\D/g, ''), 10)) {
        return 0;
      } else {
        return parseInt(checkItem.toString().replace(/\D/g, ''), 10);
      }
    } else {
      return parseInt(checkItem, 10);
    }
  }
}
