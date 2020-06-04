import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// for url
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardCreateComponent } from './board-create/board-create.component';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardDetailComponent } from './board-detail/board-detail.component';

// for Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';

// for FlexLayout
import { FlexLayoutModule } from '@angular/flex-layout';

// for User
import { UserLoginComponent } from './user-login/user-login.component';
import { UserJoinComponent } from './user-join/user-join.component';

// for Interceptor
import {RequestService} from './service/request.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpInterceptorService} from './service/http-interceptor.service';
import { CommonComponent } from './common/common.component';


@NgModule({
  declarations: [
    AppComponent,
    // my app
    BoardCreateComponent,
    BoardListComponent,
    BoardDetailComponent,
    UserLoginComponent,
    UserJoinComponent,
    CommonComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    RequestService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
