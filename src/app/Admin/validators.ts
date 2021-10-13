import { AbstractControl } from "@angular/forms";

export function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
    const emailControl = c.get('password');
    const confirmControl = c.get('confirmPassword');
  
    if (emailControl?.pristine || confirmControl?.pristine) {
      return null;
    }
  
    if (emailControl?.value === confirmControl?.value) {
      return null;
    }
    return { match: true };
  }
  

  export function streetNumberValidator(c: AbstractControl): { [key: string]: boolean } | null {
    
  
    if (c?.pristine || c?.pristine) {
      return null;
    }
  
    if (c?.value>999 && c.value < 9999) {
      return null;
    }
    return { street: true };
  }
  