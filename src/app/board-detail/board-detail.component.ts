import {Component, Injector, OnInit} from '@angular/core';
import { Board } from '../board';
// import { BOARDS } from '../mock-boards';
import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from '../service/data.service';
import {AuthenticationService} from '../service/authentication.service';
import {CommonComponent} from '../common/common.component';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent extends CommonComponent {
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

  constructor(route: ActivatedRoute,
              router: Router,
              dataService: DataService,
              authService: AuthenticationService,
              appInjector: Injector) {
    super(route, router, dataService, authService, appInjector);
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
      this.board = data;
      this.board.views = this.board.views + 1;
      this.onViewUpdate();
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

  submitUserCheck(): void {
    // redirect to home if already logged in
    if (!this.authService.currentUserValue) {
      this.router.navigateByUrl('/login');
    } else if (this.authService.currentUserValue.user.pk === this.board.username) {
      this.router.navigateByUrl('/board-update/' + this.board.id);
    } else {
      alert('수정권한이 없습니다');
      this.router.navigateByUrl('/');
    }
  }

}
