import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { FormControl,FormGroup,Validators,ValidatorFn, AbstractControl,ValidationErrors,NgForm,FormGroupDirective } from '@angular/forms';
import { _AbstractConstructor } from '@angular/material/core';

import { ErrorStateMatcher } from '@angular/material/core';

import { AuthService } from 'src/app/auth/auth.service';


// arreglar funcionament mat-error
class FormStateMatcher implements ErrorStateMatcher {
  private errorCode: string;
  constructor(errorCode: string) {
    this.errorCode = errorCode;
  }
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): any {
    return (control!.touched || control!.dirty) && (control!.invalid || form!.hasError(this.errorCode));
  }
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SignupComponent implements OnInit {


  login:any;
  signup:any;
  loading:boolean = false
  readonly passwordMatcher = new FormStateMatcher('passwordMatcher');
  

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.login = new FormGroup({
      email: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),
    });

    this.signup = new FormGroup({
      username: new FormControl('',[
        Validators.required
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl('',[
        Validators.required,
      ]),
    },[ this.checkPasswords.bind(this)]);
  }

  onLogin() {
    console.log("Login");
    if(this.login.valid){
      console.log(this.login.value)
      this.loading = true
      this.authService.login(this.signup.value.email, this.signup.value.password)
      this.loading = false
    }
  }

  onSignup() {
    console.log("register");
    if(this.signup.valid){
      console.log(this.signup.value)
      this.loading = true
      this.authService.createUser(this.signup.value.username, this.signup.value.email, this.signup.value.password)
      this.loading = false
  }
  }

  private checkPasswords(group: AbstractControl): ValidationErrors | null {
    // comprovar match comtrasenyes
    const { password, confirmPassword } = group.value || {}
    if (password !== confirmPassword) {
      return { passwordMatcher: true };
    }
    return null;
  }
  
}
