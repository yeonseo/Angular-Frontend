import { Component, OnInit } from '@angular/core';
import { Board } from '../board';
// import { BOARDS } from '../mock-boards';
import {ActivatedRoute} from '@angular/router';
import { DataService } from '../service/data.service';
import {_isNumberValue} from "@angular/cdk/coercion";
import {formatNumber} from "@angular/common";
import {compareNumbers, toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {
  text = 'YS board detail View!!';
  private pageNum: number;
  public board: Board = {
    id: '',
    title: '',
    username: '',
    created: '',
    updated: '',
    views: 0,
    content: ''
  };
  // boards = BOARDS;

  constructor(route: ActivatedRoute, private dataService: DataService) {
    this.pageNum = route.snapshot.params['page-num'];
    // this.pageData = this.boards[this.pageNum];
  }

  ngOnInit(): void {
    /* we defined a products variable and called
     *  the sendGetRequest() method of the service
     *  for fetching data from the JSON REST API server.
     *  return value of the HttpClient.get() method which is an RxJS Observable
     *  When data is received, we added it in the products array.
     */
    this.dataService.sendGetRequest('freeboards/' + this.pageNum).subscribe((data: any) => {
      console.log(data);
      this.board = data;
      console.log(this.board);
      console.log(data['views']);
      this.board.views = this.board.views + 1;
      console.log(this.board);
      this.onViewUpdate();
      console.log(this.board.views);
      console.log(this.board.views + 1);
    });


  }

  public onViewUpdate(): void {
    this.dataService.updateRequest('freeboards/' + this.pageNum + '/update/',
      {
        title: this.board.title,
        content: this.board.content,
        username: this.board.username,
        views: this.board.views})
      .subscribe((data: any) => {
        console.log(data);
        console.log(this.board);
      });
  }

  onDelete(): void {
    this.dataService.deleteRequest('freeboards/' + this.pageNum + '/delete/').subscribe(
      (val) => {
        console.log('DELETE call successful value returned in body', val);
      },
      response => {
        console.log('DELETE call in error', response);
      },
      () => {
        console.log('The DELETE observable is now completed.');
      }
    );
    // 왜 subscribe()이 있어야 하지???
    this.dataService.goBoardList();
  }

}
