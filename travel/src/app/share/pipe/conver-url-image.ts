import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fetchUrl',
})

export class FetchUrl implements PipeTransform {
  transform(namePicture: string) {
    const url = 'http://localhost:3000/uploads/';
    return url + namePicture;
  }
}
