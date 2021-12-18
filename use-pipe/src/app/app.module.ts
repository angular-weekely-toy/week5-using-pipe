import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SearchPipePipe } from './pipe/search-pipe.pipe'
import { NzInputModule } from 'ng-zorro-antd/input';


@NgModule({
  declarations: [
    AppComponent,
    SearchPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NzInputModule
  ],
  providers: [
    SearchPipePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
