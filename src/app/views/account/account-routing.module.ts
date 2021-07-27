import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { Shell } from '@shared/shell/shell.service'
import { AccountEditComponent } from '@views/account/account-edit/account-edit.component'
import { LoginComponent } from '@views/account/login/login.component'
import { SignUpComponent } from '@views/account/signup/sign-up.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'sign-up', component: SignUpComponent, pathMatch: 'full' },
  // Shell.childRoutes([
  //   { path: 'edit-account', component: AccountEditComponent, pathMatch: 'full' }
  // ])
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
