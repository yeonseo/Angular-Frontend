import { Component, OnInit } from '@angular/core';
import { Board } from '../board';
// import { BOARDS } from '../mock-boards';
import { DataService } from '../data.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {
  CLASS_NAME = 'BoardListComponent';

  text = 'YS board list View!!';
  datas = [];
  selectedBoard: Board;

  // boards = BOARDS;
  // boardTitle = '날씨가 매우 죠아용';
  // boardName = '얀버그';
  // boardDay = '2020. 05. 11';
  // boardViews = '10';
  // boardContexts = '오늘 저녁에는 보라매공원을 걸을 꺼야. 내일은 헬스장에 가야한다.';
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    /* we defined a products variable and called
     *  the sendGetRequest() method of the service
     *  for fetching data from the JSON REST API server.
     *  return value of the HttpClient.get() method which is an RxJS Observable
     *  When data is received, we added it in the products array.
     */
    this.dataService.sendGetRequest('freeboards/').subscribe((data: any[]) => {
      console.log(data);
      this.datas = data;
    });
  }

  onSelect(board: Board): void {
    this.selectedBoard = board;
  }
}
