import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HelperFunctionsService {

 
  constructor() { }


  // Reusable function to show the uniqueObjArray 
  uniqueObjArray(arr: any[], key: string) {
      return [...new Map(arr.map(item =>
          [item[key], item])).values()]
  }


  // Delete null values of object
  deleteNullValueOfObj(obj: any) {
      Object.keys(obj).forEach(key => {
          if (!obj[key]) {
              delete obj[key]
          }
      })
      return obj
  }


  /**
    * Change route url without reload.
    * @param  {Router} router.
    * @param  {ActivatedRoute} activateRoute.
    */
  changeRouteParams(router: Router, activateRoute: ActivatedRoute, params: any): void {
    router.navigate(
        [],
        {
            relativeTo: activateRoute,
            queryParams: params,
        });
  }


  /**
    * Change date formate that come from backend to set to ngDatePicker.
    * @param  {date} string.
    * @returns {object}
    */
  changeDateForMateToSet(date: string): object {
      const dateFormate = date?.split('T')[0].split('-');
      return {
          day: dateFormate ? +dateFormate[2] : null,
          month: dateFormate ? +dateFormate[1] : null,
          year: dateFormate ? +dateFormate[0] : null,
      }
  }


  arrayHasDuplicate(array: any[], key: any): boolean {
      
      let valueArr: any,
      isDuplicate: boolean,
      isArrayOfKeys: Boolean = false;

      if (Array.isArray(key)) {
          isArrayOfKeys = true
          valueArr = array.map(function(item){ 
              return key.map( subItem => item[subItem])
          });

      } else {
          valueArr = array.map(function(item){ return item[key] });
      }

      if (isArrayOfKeys) {
          const uniqueValues = Array.from(new Map(valueArr.map((p: any) => [p.join(), p])).values())
          isDuplicate = uniqueValues.length != valueArr.length;
      } else {
          isDuplicate = valueArr.some(function(item: any, idx: any){ 
              return valueArr.indexOf(item) != idx 
          });
      }
      
      return isDuplicate
  }


   isNaturalNumber(n: number): boolean  {
	   if (typeof n !== 'number') {        
            return false; 
       }
	 return (n >= 0.0) && (Math.floor(n) === n) && n !== Infinity;
    }




    isTooDark(color: any) {

        return (([r, g, b]: any) =>
            (0.2126 * r + 0.7152 * g + 0.0722 * b) < 40)
        (this.hexToRgb(color));
    }



    hexToRgb(hex: any){
      return  (value =>
            value.length === 3
            ? value.split('').map((c: any) => parseInt(c.repeat(2), 16))
            : value.match(/.{1,2}/g).map((v: any) => parseInt(v, 16)))
        (hex.replace('#', ''));
    }


    copy(content: any): Promise<any> {
        return navigator.clipboard.writeText(content)
    }
}