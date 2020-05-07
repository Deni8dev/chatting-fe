import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ShellComponent } from '@shared/shell/shell.component';


@NgModule({
  declarations: [ShellComponent],
  imports: [
    SharedModule
  ]
})
export class ShellModule {
}
