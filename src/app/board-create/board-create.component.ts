import {Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DataService } from '../service/data.service';
import {Board} from '../board';
import {NgForm} from '@angular/forms';
import {isUndefined} from "util";

@Component({
  selector: 'app-board-create',
  templateUrl: './board-create.component.html',
  styleUrls: ['./board-create.component.css'],
})

export class BoardCreateComponent implements OnInit {
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

  constructor(route: ActivatedRoute, private dataService: DataService) {
    if (route.snapshot.params['page-num'] !== '' || route.snapshot.params['page-num'] !== null){
      this.pageNum = route.snapshot.params['page-num'];
    }
  }

  ngOnInit(): void {
    if ( this.pageNum >= 0 ) {
      this.dataService.sendGetRequest('freeboards/' + this.pageNum).subscribe((data: any) => {
        console.log(data);
        this.board = data;
        console.log(this.board);
      });
    }

  }

  onClickMe(f: NgForm) {
    this.clickMessage = 'You input title : ' + f.value;
    console.log(f.value);
  }

  onSubmit(f: NgForm): void{
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

