import { Component, OnInit } from '@angular/core';
import { ApiService, HttpOption } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Basket, Pantry } from 'src/app/models/pantry';
import { map, mergeMap } from 'rxjs/operators';
import { of, zip } from 'rxjs';
import { Todo } from 'src/app/models/todo';
import { NgForm } from '@angular/forms';
import { RandomUtil } from 'src/app/utils/RandomUtil';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {
  viewDay = new Date();
  todos: Todo[] = [];
  constructor(private apiService: ApiService, private alertService: AlertService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    const day = this.viewDayStart;
    this.alertService.progressTask(
      this.apiService.get<Pantry>(environment.pantryStorageUrl, {noAlertProgress: true}).pipe(
      map(it => it.baskets.filter(bit => bit.name.startsWith(day)).sort((a, b) => a.ttl - b.ttl).map(bit => this.apiService.get<Todo>(`${environment.pantryStorageUrl}/basket/${bit.name}`, {noAlertProgress: true}))),
      mergeMap(it => it?.length ? zip(...it) : of([]))
    ), 'todo').subscribe(it => this.todos = it);
  }

  get viewDayStart(): string {
    return this.datePipe.transform(this.viewDay, 'yyyyMMdd');
  }

  previous(): void {
    this.viewDay = new Date(this.viewDay.setDate(this.viewDay.getDate() - 1));
    this.load();
  }

  next(): void {
    this.viewDay = new Date(this.viewDay.setDate(this.viewDay.getDate() + 1));
    this.load();
  }

  onSubmit(f: NgForm): void {
    if (f.valid) {
      const key = `${this.viewDayStart}-${RandomUtil.uuid()}`;
      const body = {key, ...f.value};
      this.apiService.post<void>(`${environment.pantryStorageUrl}/basket/${key}`, body, {observe: 'response', responseType: 'text'})
        .subscribe(it => this.load());
      f.reset();
    } else {
      this.alertService.showDanger('required');
    }
  }

  delete(key: string): void {
    this.apiService.delete<void>(`${environment.pantryStorageUrl}/basket/${key}`, {observe: 'response', responseType: 'text'})
      .subscribe(it => this.load());
  }

  update(todo: Todo): void {
    this.apiService.put<void>(`${environment.pantryStorageUrl}/basket/${todo.key}`, todo, {observe: 'response', responseType: 'text'})
      .subscribe(it => this.load());
  }
}
