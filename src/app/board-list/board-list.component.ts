import {Component, OnInit, ViewChild} from '@angular/core';
import { Board } from '../board';
// import { BOARDS } from '../mock-boards';
import { DataService } from '../service/data.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

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

  displayedColumns: string[] = ['id', 'title', 'username', 'created', 'views'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    /* we defined a products variable and called
     *  the sendGetRequest() method of the service
     *  for fetching data from the JSON REST API server.
     *  return value of the HttpClient.get() method which is an RxJS Observable
     *  When data is received, we added it in the products array.
     */
    this.dataService.sendGetRequest('freeboards/').subscribe((data: any[]) => {
      this.datas = data;
      this.dataSource = new MatTableDataSource<Board>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  onSelect(board: Board): void {
    this.selectedBoard = board;
  }

}
