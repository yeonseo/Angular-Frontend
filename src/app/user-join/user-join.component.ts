import { Component, OnInit } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.joinForm = new FormGroup({
        'username': new FormControl(this.joinUser.username, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ]),
        'password1': new FormControl(this.joinUser.password1, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9]*'),
        ]),
        'password2': new FormControl(this.joinUser.password2, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9]*'),
        ]),
        'email': new FormControl(this.joinUser.password2, [
          Validators.required,
          Validators.email
        ])
      },
      { validators: passwordCompare }
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
      },
      response => {
        console.log('POST call in error', response);
      },
      () => {
        console.log('The POST observable is now completed.');
        this.dataService.goBoardList();
      }
    );
  }

  get username() { return this.joinForm.get('username'); }
  get email() { return this.joinForm.get('email'); }
  get password1() { return this.joinForm.get('password1'); }
  get password2() { return this.joinForm.get('password2'); }

}

export const passwordCompare: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password1 = control.get('password1');
  const password2 = control.get('password2');

  return ( password1.value !== password2.value ) ? { comparePassword: true } : null;
};
