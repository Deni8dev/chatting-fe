import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { HomePageRoutingModule } from '@views/home-page/home-page-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    HomePageRoutingModule
  ]
})
export class HomePageModule {
}
