import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'imageSrcById'
})
export class ImageByIdPipe implements PipeTransform {
  transform(id: number): string {
    return `../../../../../assets/users/${id}.jpg`;
  }

}
