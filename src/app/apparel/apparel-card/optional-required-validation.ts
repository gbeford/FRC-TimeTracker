import { AbstractControl, ValidatorFn } from '@angular/forms';

// custom validator to check a bool to see if you should fire validation
export function OptionalRequired(validator: ValidatorFn, showFlag: boolean) {
    return (control: AbstractControl): {[key: string]: any} => {

        if (showFlag) {
            return validator(control);
        } else {
            return null;
        }
    };
}
