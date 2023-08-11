import { Component, OnInit } from '@angular/core';
import { Track } from '../track/track.component';
import { CrateDataService } from '../service/data/crate-data.service';
import { ActivatedRoute, Router } from '@angular/router';

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
export class CrateComponent implements OnInit {
  id: number = 0;
  crate!: Crate;

  constructor(
    private crateDataService: CrateDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe( (data) => {
      this.id = data['id'];
      this.crateDataService.retrieveCrateTracks(this.id).subscribe(data => this.crate = data);
    })    
  }
}
