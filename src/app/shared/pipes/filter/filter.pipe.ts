import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: any[], query: any, value: any): any {        
    if(!arr)return null;
    if(!value)return [];
    if (value) {
      let x = arr.filter(function(data: any){                
        return data[query] == value;
      });      
      return x
    }
  }
}
