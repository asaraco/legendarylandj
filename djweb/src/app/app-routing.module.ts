import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrateComponent } from './crate/crate.component';
import { LibraryComponent } from './library/library.component';

const routes: Routes = [
  { path: 'browseCrate/:id', component: CrateComponent },
  { path: 'artistsBy/:ch', component: LibraryComponent },
  { path: 'browseAll', component: LibraryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
