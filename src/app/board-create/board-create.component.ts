import {Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from '../service/data.service';
import {Board} from '../board';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {CommonComponent} from "../common/common.component";
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-board-create',
  templateUrl: './board-create.component.html',
  styleUrls: ['./board-create.component.css'],
})

export class BoardCreateComponent extends CommonComponent {
  text = 'YS board create View!!';
  boardForm: FormGroup;
  board = {
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
    if ( this.pageNum >= 0 ) {
      this.dataService.sendGetRequest('freeboards/' + this.pageNum).subscribe((data: any) => {
        this.board = data;
      });
    }

    this.boardForm = new FormGroup({
        'title': new FormControl(this.board.title, [
          Validators.required,
          Validators.minLength(1),
        ]),
        'content': new FormControl(this.board.content, [
          Validators.required,
          Validators.minLength(1),
        ]),
      },
      /* { validators: identityRevealedValidator }); // <-- add custom validator at the  */);
  }

  onSubmit(): void {
    let urlOption = '';
    if ( this.pageNum >= 0) {
      urlOption = 'freeboards/' + this.pageNum + '/update/';
      this.dataService.updateRequest(urlOption, this.board).subscribe(
        (val) => {
          // console.log('POST call successful value returned in body', val);
        },
        response => {
          // console.log('POST call in error', response);
        },
        () => {
          // console.log('The POST observable is now completed.');
        }
      );
    } else {
      urlOption = 'freeboards/create/';
      this.dataService.createRequest(urlOption, this.board).subscribe(
        (val) => {
          // console.log('POST call successful value returned in body', val);
          this.dataService.goBoardList();
        },
        response => {
          // console.log('POST call in error : ', response);
        },
        () => {
          // console.log('The POST observable is now completed.');
        }
      );
    }
  } // end of onSubmit()


  get title() {
    return this.boardForm.get('title');
  }

  get content() {
    return this.boardForm.get('content');
  }
}

