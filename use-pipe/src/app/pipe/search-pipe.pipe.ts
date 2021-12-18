import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(value: any, searchText?: string): any {

    if (!searchText) { return value; }
    const regexp = new RegExp(searchText, 'gi');
    
    return value?.replace(regexp, "<mark>$&</mark>");
  }

}
