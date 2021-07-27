import { NgModule } from '@angular/core'
import { AccountModule } from '@views/account'
import { HomePageModule } from '@views/home-page'
import { ViewsRoutingModule } from '@views/views-routing.module'


@NgModule({
  declarations: [],
  imports: [
    AccountModule,
    HomePageModule,
    ViewsRoutingModule
  ]
})
export class ViewsModule {}
