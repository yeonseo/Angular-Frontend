import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BoardCreateComponent } from './board-create/board-create.component';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardDetailComponent } from './board-detail/board-detail.component';
import {UserLoginComponent} from './user-login/user-login.component';
import {UserJoinComponent} from './user-join/user-join.component';

const routes: Routes = [
  { path: '', component: BoardListComponent },
  { path: 'board-create', component: BoardCreateComponent },
  { path: 'board-update/:page-num', component: BoardCreateComponent },
  { path: 'board-list', component: BoardListComponent },
  { path: 'board-detail/:page-num', component: BoardDetailComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'join', component: UserJoinComponent, data: {routeName: 'login'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
