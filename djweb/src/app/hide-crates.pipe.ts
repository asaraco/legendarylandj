import { Pipe, PipeTransform } from '@angular/core';
import { Track } from './track/track.component';
import { CRATES_HIDDEN } from './app.constants';

@Pipe({
  name: 'hideCrates'
})
export class HideCratesPipe implements PipeTransform {

  transform(data: Track[]): any {
    // See below: need to check "data" exists so this can be used asynchronously (w/ "subscribe")
    // https://stackoverflow.com/questions/43239105/angular-4-0-0-custom-pipe-always-sending-undefined
    if (data) {
      var filteredTracks: Track[] = new Array<Track>();
      data.forEach(t => {
        var hide = false;
        CRATES_HIDDEN.forEach(x => {
          if(t.crateIds.includes(x)) {
            hide = true;
          }
        });
        if (!hide) {
          filteredTracks.push(t);
        }
      });
      return filteredTracks;
    }    
  }

}
