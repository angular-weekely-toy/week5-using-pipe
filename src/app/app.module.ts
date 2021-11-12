import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoPageComponent } from './pages/todo/todo-page.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { DatePipe, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import localeKo from '@angular/common/locales/ko';
import { InputDelayDirective } from './directives/inputDelay.directive';

/*
declarations - 이 모듈에서 사용하는 뷰 클래스를 정의한다. Angular에는 컴포넌트, 디렉티브, 파이프 세 종류의 뷰 클래스가 있다.
exports - 다른 모듈이나 컴포넌트 템플릿에서 접근할 수 있도록 외부로 공개 선언한다.
import - export로 공개된 클래스를 다른 컴포넌트 템플릿의 this 모듈에 선언해서 사용할 때 사용한다.
providers - 전역에서 사용되는 서비스를 해당 객체에서 사용할 수 있도록 생성하고 지정한다. 프로바이더는 앱의 모든 곳에서 접근할 수 있다.
bootstrap - 루트 컴포넌트라고 하는 메인 어플리케이션의 뷰를 선언한다. bootstrap 항목은 루트 모듈에만 존재한다.
 */
/*
declarations: 해당 NgModule에 포함될 컴포넌트나 디렉티브, 파이프 를 선언합니다.
exports: 모듈의 구성 요소를 다른 NgModule이나 컴포넌트 템플릿 으로 재사용할 수 있도록 외부로 공개합니다.
imports: 다른 모듈에서 공개한 클래스를 지금 정의하는 NgModule에 가져올 때 사용합니다.
providers: NgModule 컨텍스트 안에서 사용하는 서비스 프로바이더를 지정합니다. NgModule 안에서 사용하는 서비스는
  이렇게 지정된 서비스 프로바이더를 사용해서 생성되며, 필요한 경우에는 하위 계층에 사용할 서비스 프로바이더를 따로 지정할 수도 있습니다.
bootstrap: 애플리케이션의 최상위 뷰로 표시될 최상위 컴포넌트 를 지정합니다. bootstrap 프로퍼티는 최상위 NgModule 에만 지정할 수 있습니다.
*/
registerLocaleData(localeKo);
@NgModule({
  declarations: [
    AppComponent,
    TodoPageComponent,
    TodoItemComponent,
    InputDelayDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [DatePipe, {provide: LOCALE_ID, useValue: navigator.languages[0] ?? 'ko-KR' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
