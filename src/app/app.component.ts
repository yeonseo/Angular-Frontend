import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-view';
  userToken = '';
  constructor(private authService: AuthenticationService) { }

  ngOnInit(){
    console.log(this.authService.currentUser);
    if (this.authService.currentUser.hasOwnProperty('token') ){
      this.authService.currentUser.subscribe((data: any) => {
        this.userToken = data.token;
      });
    }
    console.log('user token : ' + this.userToken);
  }

  logout() {
    this.authService.logout();
  }
}
