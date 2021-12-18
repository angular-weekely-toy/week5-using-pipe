import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoPageComponent } from './pages/todo/todo.page.component';
import { HomePageComponent } from './pages/home/home.page.component';
import { BookSearchPageComponent } from './pages/book-search/book-search.page.component';
import { CalendarPageComponent } from './pages/calendar/calendar.page.component';
import { CatSearchPageComponent } from './pages/cat-search/cat-search.page.component';
import { EmojiComponent } from './pages/emoji/emoji.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'todo', component: TodoPageComponent},
  {path: 'book-search', component: BookSearchPageComponent},
  {path: 'calendar', component: CalendarPageComponent},
  {path: 'cat-search', component: CatSearchPageComponent},
  {path: 'emoji', component: EmojiComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
