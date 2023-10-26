import { Pipe, PipeTransform } from '@angular/core';
import { CRATES_HIDDEN } from './app.constants';
import { Track } from './track/track.component';

/**
 * Custom "group by" pipe transform to emulate Angular 1 behavior
 * Inspired by code from:
 *  https://stackoverflow.com/questions/37248580/how-to-group-data-in-angular-2
 *  https://plnkr.co/edit/49fWY1rMbSZtNQ3H
 */

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  transform(data: any, groupField: string): any {
    // See below: need to check "data" exists so this can be used asynchronously (w/ "subscribe")
    // https://stackoverflow.com/questions/43239105/angular-4-0-0-custom-pipe-always-sending-undefined
    if (data) {
      var groupedData = data.reduce((result: any, cur: any) => {
        (result[cur[groupField]] = result[cur[groupField]] || []).push(cur);
        return result;
      }, {});
      return Object.keys(groupedData).sort().map(group => ({ group, items: groupedData[group]}));
    }    
  }

}