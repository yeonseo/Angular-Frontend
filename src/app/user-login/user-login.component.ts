import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {DataService} from '../data.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  clickMessage = '';

  constructor(private dataService: DataService,) { }

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
