import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function emailValidation(emailRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {
    [key: string]: any
  } => {
    const email = control.value;
    const no = emailRe.test(email);
    return no ? { 'forbiddenemail': { email } } : null;
  };
}

@Directive({
  selector: '[validateEmail]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
})
export class EmailValidatorDirective implements Validator, OnChanges {
  @Input() forbiddenName: string;
  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['forbiddenName'];
    if (change) {
      const val: string | RegExp = change.currentValue;
      const re = val instanceof RegExp ? val : new RegExp(val, 'i');
      this.valFn = emailValidation(re);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): {
    [key: string]: any
  } {
    return this.valFn(control);
  }
}
