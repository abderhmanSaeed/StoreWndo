import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './explore.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
    import(
      './modules/shorts/shorts.module'
    ).then((m) => m.ShortsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExploreRoutingModule { }
