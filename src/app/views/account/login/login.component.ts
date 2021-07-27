import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Logger } from '@core/logging'
import { Forms } from '@shared/components'

const logger = new Logger('Login')

@Component({
  selector: 'cht-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  hide: boolean
  form: FormGroup

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm()
  }

  login(): void {
    logger.debug(this.form.getRawValue())
  }

  private buildForm(): void {
    this.form = this._formBuilder.group({
      username: Forms.buildFormControl(),
      password: Forms.buildFormControl()
    })
  }

  get formPasswordType(): string {
    return this.hide ? 'password' : 'text'
  }
}
