import {Component, Injector, OnInit} from '@angular/core';
import { Board } from '../board';
// import { BOARDS } from '../mock-boards';
import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from '../service/data.service';
import {AuthenticationService} from '../service/authentication.service';
import {CommonComponent} from '../common/common.component';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent extends CommonComponent {
  text = 'YS board detail View!!';
  private pageNum: number;
  public board = {
    id: '',
    title: '',
    username: '',
    created: '',
    updated: '',
    views: 0,
    content: '',
    comments: [],
  };

  commentForm: FormGroup;

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
    });

    this.commentForm = new FormGroup({
      comment: new FormControl()
    });
  }

  onDelete(): void {
    if (this.submitUserCheck()) {
      if (confirm('게시물을 정말 삭제하시겠습니까? 삭제된 게시물은 다시 복구되지 않습니다.')) {
        this.dataService.deleteRequest('freeboards/' + this.pageNum + '/delete/').subscribe(
          (val) => {
            // console.log('DELETE call successful value returned in body', val);
            alert('게시물이 성공적으로 삭제되었습니다.');
          },
          response => {
            // console.log('DELETE call in error', response);
            alert('잘못된 접근입니다.');
          },
          () => {
            // console.log('The DELETE observable is now completed.');
          }
        );
        // [???] 왜 subscribe()이 있어야 하지?
        this.dataService.goBoardList();
      } // end of if (confirm)
    } // end of if (this.submitUserCheck())
  }

  onModify(): void {
    if (this.submitUserCheck()) {
      this.router.navigateByUrl('/board-update/' + this.board.id);
    }
  }

  onCommentSubmit(): void {
    this.dataService.createRequest('freeboards/' + this.board.id + '/comment_create/', {'comment': this.commentForm.get('comment').value, 'board': this.board.id}).subscribe(
      (val) => {
        // console.log('POST call successful value returned in body', val);
        this.router.navigateByUrl('/board-detail/' + this.board.id);
        window.location.reload();
      },
      response => {
        // console.log('POST call in error', response);
        if (confirm('로그인 하시면 댓글을 쓸 수 있습니다. 로그인하시겠습니까?')) {
          this.router.navigateByUrl('/login');
        }
      },
      () => {
        // console.log('The POST observable is now completed.');
      }
    );
  }

  userLoginCheck(): void {
    if (!this.authService.currentUserValue) {
      if (confirm('로그인 하시면 댓글을 쓸 수 있습니다. 로그인하시겠습니까?')) {
        this.router.navigateByUrl('/login');
      } else {
        document.getElementById('comment').setAttribute('readonly', 'readonly');
      }
    }
  }

  submitUserCheck(): boolean {
    // redirect to home if already logged in
    if (!this.authService.currentUserValue) {
      this.router.navigateByUrl('/login');
    } else if (this.authService.currentUserValue.user.username === this.board.username) {
      return true;
    }   else {
      alert('수정권한이 없습니다');
    }
    return false;
  }

  get comment() {
    return this.commentForm.get('comment');
  }
}
