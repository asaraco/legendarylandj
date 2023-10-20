import { Pipe, PipeTransform } from '@angular/core';

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
    // See below: need to check "data" exists so this can be used asynchronously (w/ "subscribe")
    // https://stackoverflow.com/questions/43239105/angular-4-0-0-custom-pipe-always-sending-undefined
    if (data) {
      // Acting on input "data" (JSON), traverse each "current item"
      // and store it in "existing group" if comparison checks out
      var groupedData = data.reduce((existingGroups: any, currentItem: any) => {
        let tSortArt = currentItem['sortArtist'];
        let tArt = currentItem['artist'];
        let tAlbumArt = currentItem['albumArtist'];
        
        if (tSortArt == "(no artist)") {
          currentItem['artist'] = "(no artist)";
        } 

        // "If the existing groups contain a group label that matches current item's value for the 'sortArtist' field..."
        if (existingGroups[tSortArt]) {
          existingGroups[tSortArt].push(currentItem);
        } else {
          //let groupHeader = {"groupName": currentItem['artist']};
          // Choose and store the best "display artist"
          let groupHeader = {"groupName": tSortArt}; // I expect this to get overwritten
          if (tAlbumArt && tAlbumArt.toLowerCase().includes(tSortArt)) {
            groupHeader = {"groupName": tAlbumArt};
          } else if (tArt && tArt.toLowerCase().includes(tSortArt)) {
            groupHeader = {"groupName": tArt};
          }
          // Initialize the group
          existingGroups[tSortArt] = [groupHeader];
          existingGroups[tSortArt].push(currentItem);
        }
        
        return existingGroups;
      }, {});
      //console.log(JSON.stringify(groupedData));
      return Object.keys(groupedData).map(group => ({ group, items: groupedData[group]}));
    }    
  }

}
