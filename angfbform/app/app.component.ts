import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        this.passwordStrengthValidator
      ]]
    });
  }

  ngOnInit() { }

  get name() { return this.registrationForm.get('name'); }
  get email() { return this.registrationForm.get('email'); }
  get password() { return this.registrationForm.get('password'); }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!password) return null;

    const hasUpperCase = /[A-Z]+/.test(password);
    const hasLowerCase = /[a-z]+/.test(password);
    const hasNumber = /\d+/.test(password);

    const valid = hasUpperCase && hasLowerCase && hasNumber;
    return valid ? null : { 
      passwordStrength: {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.'
      } 
    }; 
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form submitted!', this.registrationForm.value);
      // Proceed with registration logic
    }
  }
}