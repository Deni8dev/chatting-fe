import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountModule } from '@views/account';
import { HomePageModule } from '@views/home-page';


const routes: Routes = [
  { path: '', component: HomePageModule },
  { path: 'acc', component: AccountModule }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule {
}
