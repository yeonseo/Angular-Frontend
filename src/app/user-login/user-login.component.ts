import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {DataService} from '../service/data.service';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  clickMessage = '';

  constructor(private authService: AuthenticationService, private dataService: DataService) { }

  ngOnInit(): void {
  }

  onClickMe(f: NgForm) {
    this.clickMessage = 'You input title : ' + f.value;
    console.log(f.value);
  }

  onSubmit(f: NgForm): void{
    this.authService.login(f.value).subscribe(
      (val) => {
        console.log('POST call successful value returned in body', val);
      },
      response => {
        console.log('POST call in error', response);
      },
      () => {
        console.log('The POST observable is now completed.');
      }
    );

    this.clickMessage = 'You are my hero!';

    this.dataService.goBoardList();
  }
}
