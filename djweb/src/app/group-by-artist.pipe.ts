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
  name: 'groupByArtist'
})
export class GroupByArtistPipe implements PipeTransform {

  transform(data: any): any {
    let groupByField = 'artist';
    // See below: need to check "data" exists so this can be used asynchronously (w/ "subscribe")
    // https://stackoverflow.com/questions/43239105/angular-4-0-0-custom-pipe-always-sending-undefined
    if (data) {
      // Acting on input "data" (JSON), traverse each "current item"
      // and store it in "existing group" if comparison checks out
      var groupedData = data.reduce((existingGroups: any, currentItem: any) => {
        if (currentItem[groupByField] == null) {
          currentItem[groupByField] = "no artist";
        } 

        // Check if current item has an "album artist" field value, and if so, store in temp field (with case conversion)
        let currentAlbumArtist = currentItem['albumArtist'] ? currentItem['albumArtist'].toUpperCase() : null;
        // "If the existing groups contain a group label that matches current item's value for the 'groupBy' field..."
        if (currentAlbumArtist && existingGroups[currentAlbumArtist]) {
          existingGroups[currentItem['albumArtist'].toUpperCase()].push(currentItem);
        } else if (existingGroups[currentItem[groupByField].toUpperCase()]) {
          existingGroups[currentItem[groupByField].toUpperCase()].push(currentItem);          
        } else {
          existingGroups[currentItem[groupByField].toUpperCase()] = [currentItem];
        }
        
        return existingGroups;
      }, {});
      return Object.keys(groupedData).map(group => ({ group, items: groupedData[group]}));
    }    
  }

}
