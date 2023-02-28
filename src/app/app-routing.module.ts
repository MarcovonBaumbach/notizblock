import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BinComponent } from './bin/bin.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  {path: '', component: NotesComponent},
  {path: 'bin', component: BinComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
