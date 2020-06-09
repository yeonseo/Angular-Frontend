import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
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
        ]),
        'email': new FormControl(this.joinUser.password2, [
          Validators.required,
          Validators.email
        ])
      } /* { validators: identityRevealedValidator }); // <-- add custom validator at the  */);
  }

  onClickMe() {
    this.clickMessage = 'You input title : ';
    console.log();
  }

  onSubmit(): void {
    const test = {};
    this.authService.join(test).subscribe(
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
  get password() { return this.joinForm.get('password1'); }

}
