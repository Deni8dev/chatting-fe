import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Forms } from '@shared/components';


@Component({
  selector: 'cht-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = this._formBuilder.group({
      name: Forms.buildFormControl(),
      email: Forms.buildFormControl(Validators.email),
      phone: Forms.buildFormControl(),
      birthDate: Forms.buildFormControl()
    });
  }
}
