import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { TrackComponent } from './track/track.component';
import { PlaylistTrackComponent } from './playlist-track/playlist-track.component';
import { CrateComponent } from './crate/crate.component';
import { LibraryComponent } from './library/library.component';
import { GroupByPipe } from './group-by.pipe';
import { GroupByArtistPipe } from './group-by-artist.pipe';
import { HideCratesPipe } from './hide-crates.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    TrackComponent,
    PlaylistTrackComponent,
    CrateComponent,
    LibraryComponent,
    GroupByPipe,
    GroupByArtistPipe,
    HideCratesPipe,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
