import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrateComponent } from './crate/crate.component';

const routes: Routes = [
  { path: 'browseCrate/:id', component: CrateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
