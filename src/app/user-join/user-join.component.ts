import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {DataService} from '../service/data.service';

@Component({
  selector: 'app-user-join',
  templateUrl: './user-join.component.html',
  styleUrls: ['./user-join.component.css']
})
export class UserJoinComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;

  clickMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private dataService: DataService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  onClickMe(f: NgForm) {
    this.clickMessage = 'You input title : ' + f.value;
    console.log(f.value);
  }

  onSubmit(f: NgForm): void{


    this.clickMessage = 'You are my hero!';

    this.dataService.goBoardList();
  }

}
