import { Component, OnInit,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { FormControl,FormGroup,Validators,ValidatorFn, AbstractControl,ValidationErrors,NgForm,FormGroupDirective } from '@angular/forms';
import { _AbstractConstructor } from '@angular/material/core';

import { ErrorStateMatcher } from '@angular/material/core';

import { AuthService } from 'src/app/auth/auth.service';

import { MatSnackBar} from '@angular/material/snack-bar';

// arreglar funcionament mat-error (linkejar error en el camp)
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
  public loading:boolean = false
  readonly passwordMatcher = new FormStateMatcher('passwordMatcher');

  constructor(private _snackBar: MatSnackBar,private cdRef:ChangeDetectorRef,public authService: AuthService) { }

  ngOnInit() {
    // Formolaris amb validacions login/signup
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
      this.authService.createUser(this.signup.value.username, this.signup.value.email, this.signup.value.password).subscribe({
        next: (res)=>{
          this.loading = false
          console.log(res)

          // solucionar problemes actualitzar var ngIf
          this.cdRef.detectChanges();

          let msg = "Usuari creat correctament"

          this._snackBar.open(msg, 'X', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 5 * 1000,
          });
        },
        error: (error)=>{
          let msg = "ha hagut un problema"
          this.loading = false
          console.log(error)
          this.cdRef.detectChanges();

          if (error.status == 0){
            msg = "Ha hagut un problema al connectar amb el servidor"
          }else if (error.status == 401){
            msg = "Problema amb les credencial"
          }else if (error.status == 500){
            msg = "Problema en crear usuari"
          }
          
          this._snackBar.open(msg, 'X', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 5 * 1000,
          });
          
        },
      })

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
