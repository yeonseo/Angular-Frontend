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
  userName = '';
  constructor(private authService: AuthenticationService) { }

  ngOnInit(){
    console.log(this.authService.currentUser);
    this.authService.currentUser.subscribe((data: any) => {
      if (data){
        this.userToken = data.token;
        this.userName = data.user.pk;
      }
    });
    console.log(this.userName + ' : ' + this.userToken);
  }

  logout() {
    this.authService.logout();
  }
}
