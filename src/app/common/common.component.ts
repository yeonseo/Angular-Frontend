import {Component, Injector, OnInit} from '@angular/core';
import {RequestService} from '../service/request.service';

import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from '../service/data.service';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {
  protected httpRequest: RequestService;
  protected appInjector: Injector;

  protected route: ActivatedRoute;
  protected router: Router;
  protected dataService: DataService;
  protected authService: AuthenticationService;

  constructor(route: ActivatedRoute,
              router: Router,
              dataService: DataService,
              authService: AuthenticationService,
              appInjector: Injector) {
    this.route = route;
    this.router = router;
    this.dataService = dataService;
    this.authService = authService;
    this.appInjector = appInjector;
    this.httpRequest = this.appInjector.get(RequestService);

    this.checkAuth();
  }

  public ngOnInit() {
  }

  public checkAuth() {
    console.log('checkAuth');
  }

}
