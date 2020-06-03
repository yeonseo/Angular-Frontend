import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import { Board } from '../board';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {CommonComponent} from '../common/common.component';
import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from '../service/data.service';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent extends CommonComponent {
  CLASS_NAME = 'BoardListComponent';

  text = 'YS board list View!!';
  datas = [];
  selectedBoard: Board;

  displayedColumns: string[] = ['id', 'title', 'username', 'created', 'views'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // 필요시에 아래처럼 추가
  // constructor(route: ActivatedRoute,
  //             router: Router,
  //             dataService: DataService,
  //             authService: AuthenticationService,
  //             appInjector: Injector) {
  //   super(route, router, dataService, authService, appInjector);
  //   console.log('addConstructor');
  // }

  ngOnInit() {
    /* we defined a products variable and called
     *  the sendGetRequest() method of the service
     *  for fetching data from the JSON REST API server.
     *  return value of the HttpClient.get() method which is an RxJS Observable
     *  When data is received, we added it in the products array.
     */
    this.dataService.sendGetRequest('freeboards/').subscribe((data: any[]) => {
      this.datas = data;
      console.log(data);
      this.dataSource = new MatTableDataSource<Board>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  onSelect(board: Board): void {
    this.selectedBoard = board;
  }

}
