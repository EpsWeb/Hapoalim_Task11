import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(createdAt: string | undefined): string {
    if (!createdAt) {
      return '';
    }
    const creationSeconds = new Date(createdAt!).valueOf()
    const creationNow = new Date().valueOf();
    const diff = Math.floor(creationNow - creationSeconds) / 1000
    if (diff <= 1) {
      return "just now"
    }
    if (diff <= 5) {
      return "5 seconds ago"
    }
    if (diff <= 7 * 60) {
      return "7 minutes ago"
    }
    if (diff <= 3 * 60 * 60) {
      return "3 hours ago"
    }
    return moment(creationSeconds).format('DD/MM/YYYY');
  }

}
