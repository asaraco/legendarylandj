import { Component, OnInit } from '@angular/core';
import { Track } from '../track/track.component';
import { CrateDataService } from '../service/data/crate-data.service';

export class Crate {
  id!: number;
  name: string = "";
  tracks!: Track[];
}

@Component({
  selector: 'app-crate',
  templateUrl: './crate.component.html',
  styleUrls: ['./crate.component.scss']
})
export class CrateComponent {
  id: number = 0;
  crate!: Crate;

  constructor() {}

}
