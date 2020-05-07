import { FormControl, ValidatorFn, Validators } from '@angular/forms';


export class Forms {

  public static buildFormControl(validator: ValidatorFn = null) {
    const validations = [Validators.required];
    if (validator)
      validations.push(validator);

    return new FormControl('', {
      updateOn: 'change',
      validators: validations
    });
  }
}
