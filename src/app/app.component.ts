import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './service/authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-view';
  userToken = '';
  userName = '';
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    // console.log(this.authService.currentUser);
    this.authService.currentUser.subscribe((data: any) => {
      if (data) {
        this.userToken = data.token;
        this.userName = data.user.pk;
      }
    });
    // console.log(this.userName + ' : ' + this.userToken);
  }

  onJoin() {
    if (this.authService.currentUserValue) {
      alert('로그인 상태입니다. 이미 회원가입이 되셨습니다 :-)');
    } else {
      this.router.navigate(['/join']);
    }
  }

  logout() {
    this.authService.logout();
  }
}
