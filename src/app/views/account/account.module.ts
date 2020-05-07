import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SignUpComponent } from './signup/sign-up.component';
import { AccountRoutingModule } from '@views/account/account-routing.module';
import { LoginComponent } from '@views/account/login/login.component';
import { AccountEditComponent } from './account-edit/account-edit.component';


@NgModule({
  declarations: [SignUpComponent, LoginComponent, AccountEditComponent],
  imports: [
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule {
}
