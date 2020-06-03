import {Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from '../service/data.service';
import {Board} from '../board';
import {NgForm} from '@angular/forms';
import {CommonComponent} from "../common/common.component";
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-board-create',
  templateUrl: './board-create.component.html',
  styleUrls: ['./board-create.component.css'],
})

export class BoardCreateComponent extends CommonComponent {
  text = 'YS board create View!!';
  clickMessage = '';
  board: Board = {
    id: '',
    title: '',
    username: '',
    created: '',
    updated: '',
    views: 0,
    content: '',
  };

  private pageNum = -1;

  constructor(route: ActivatedRoute,
              router: Router,
              dataService: DataService,
              authService: AuthenticationService,
              appInjector: Injector) {
    super(route, router, dataService, authService, appInjector);
    if (route.snapshot.params['page-num'] !== '' || route.snapshot.params['page-num'] !== null) {
      this.pageNum = route.snapshot.params['page-num'];
    }
  }

  ngOnInit(): void {
    this.board.username = super.getUserName();

    if ( this.pageNum >= 0 ) {
      this.dataService.sendGetRequest('freeboards/' + this.pageNum).subscribe((data: any) => {
        this.board = data;
      });
    }


  }

  onClickMe(f: NgForm) {
    this.clickMessage = 'You input title : ' + f.value;
  }

  onSubmit(f: NgForm): void {
    let urlOption = '';

    if ( this.pageNum >= 0) {
      urlOption = 'freeboards/' + this.pageNum + '/update/';
      this.dataService.updateRequest(urlOption, f.value).subscribe(
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
      console.log(this.pageNum);
    } else {
      urlOption = 'freeboards/create/';
      this.dataService.createRequest(urlOption, f.value).subscribe(
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
    }
    this.clickMessage = 'You are my hero!';

    this.dataService.goBoardList();
  }
}

