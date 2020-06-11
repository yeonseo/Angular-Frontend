import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {DataService} from '../service/data.service';

@Component({
  selector: 'app-user-join',
  templateUrl: './user-join.component.html',
  styleUrls: ['./user-join.component.css']
})
export class UserJoinComponent implements OnInit {
  joinForm: FormGroup;
  private joinUser = {
    username: '',
    password1: '',
    password2: '',
    email: ''
  };

  usernameExists = false;
  emailExists = false;

// : {
//   username: string;
//   password1: string;
//   password2: string;
//   email: string;
// }

  loading = false;
  submitted = false;
  error: string;

  clickMessage = '';

  nameControl = new FormControl('');

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService,
              private dataService: DataService,) {
  }

  ngOnInit(): void {
    this.joinForm = new FormGroup({
        'username': new FormControl(this.joinUser.username, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
        'password1': new FormControl(this.joinUser.password1, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}'),
        ]),
        'password2': new FormControl(this.joinUser.password2, [
          Validators.required,
        ]),
        'email': new FormControl(this.joinUser.password2, [
          Validators.required,
          Validators.email
        ])
      },
      {validators: [passwordCompare, passwordPreventCommon]}
      /* { validators: identityRevealedValidator }); // <-- add custom validator at the  */);
  }

  onClickMe() {
    this.clickMessage = 'You input title : ';
    console.log();
  }

  onSubmit(): void {
    const test = {};
    this.authService.join(this.joinForm.value).subscribe(
      (val) => {
        console.log('POST call successful value returned in body', val);
        alert('가입되셨습니다 ❤');
      },
      response => {
        console.log('POST call in error', response);
        if (response.error.username) {
          for ( let i = 0; i < response.error.username.length ; i++) {
            if (response.error.username[i].indexOf('already')) {
              console.log(response.error.username[i]);
              this.usernameExists = true;
            }
          }
        }
        if (response.error.email) {
          for ( let i = 0; i < response.error.email.length ; i++) {
            if (response.error.email[i].indexOf('already')) {
              console.log(response.error.email[i]);
              this.emailExists = true;
            }
          }
        }
      },
      () => {
        console.log('The POST observable is now completed.');
        this.dataService.goBoardList();
      }
    );
  }

  get username() {
    return this.joinForm.get('username');
  }

  get email() {
    return this.joinForm.get('email');
  }

  get password1() {
    return this.joinForm.get('password1');
  }

  get password2() {
    return this.joinForm.get('password2');
  }
}

export const passwordCompare: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password1 = control.get('password1');
  const password2 = control.get('password2');
  return ( password1.value !== password2.value ) ? {comparePassword: true} : null;
};

export const passwordPreventCommon: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const inputPassword = control.get('password1');

  const hasNumber = /\d/.test(inputPassword.value);
  const hasCharacter = /[A-Za-z]/.test(inputPassword.value);
  const hasUpper = /[A-Z]/.test(inputPassword.value);
  const hasLower = /[a-z]/.test(inputPassword.value);
  const hasSpecial = /[$@$!%*?&]/.test(inputPassword.value);

  if (!hasNumber) { return {passwordHasNumber: true}; }
  if (!hasCharacter) { return {passwordHasCharacter: true}; }
  // if (!hasUpper) { return {passwordHasUpper: true}; }
  // if (!hasLower) { return {passwordHasLower: true}; }
  if (!hasSpecial) { return {passwordHasSpecial: true}; }
  return null;
};

