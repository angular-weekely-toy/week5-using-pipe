import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
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
import { DateUtils } from 'src/app/utils/DateUtils';
import { InputDelayDirective } from 'src/app/directives/inputDelay.directive';
import { OpenApiNaver } from 'src/app/models/openapi-naver';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {
  private apiOptions = {observe: 'response', responseType: 'text'} as HttpOption;
  viewDay = new Date();
  todos: Todo[] = [];
  @ViewChild(InputDelayDirective) child!: InputDelayDirective;
  public openApiNaver: OpenApiNaver;
  constructor(private apiService: ApiService, private alertService: AlertService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    const day = this.viewDayStart;
    this.alertService.progressTask(
      this.apiService.get<Pantry>(environment.pantryStorageUrl, {noAlertProgress: true}).pipe(
      map(it => it.baskets.filter(bit => bit.name.startsWith(day))
        .sort((a, b) => a.ttl - b.ttl)
        .map(bit => this.apiService.get<Todo>(`${environment.pantryStorageUrl}/basket/${bit.name}`, {noAlertProgress: true}))
      ),
      mergeMap(it => it?.length ? zip(...it) : of([]))
    ), 'todo').subscribe(it => this.todos = it);
  }

  get viewDayStart(): string {
    return this.datePipe.transform(this.viewDay, 'yyyyMMdd');
  }

  previous(): void {
    this.viewDay = DateUtils.miusDays(this.viewDay, 1);
    this.load();
  }

  next(): void {
    this.viewDay = DateUtils.plusDays(this.viewDay, 1);
    this.load();
  }


  onSubmit(f: NgForm): void {
    if (f.valid) {
      const key = `${this.viewDayStart}-${RandomUtil.uuid()}`;
      const body = {key, ...f.value};
      this.apiService.post<void>(`${environment.pantryStorageUrl}/basket/${key}`, body, this.apiOptions)
        .subscribe(it => this.load());
      f.reset();
    } else {
      this.alertService.showDanger('required');
    }
  }

  delete(key: string): void {
    this.apiService.delete<void>(`${environment.pantryStorageUrl}/basket/${key}`,  this.apiOptions)
      .subscribe(it => this.load());
  }

  update(todo: Todo): void {
    this.apiService.put<void>(`${environment.pantryStorageUrl}/basket/${todo.key}`, todo,  this.apiOptions)
      .subscribe(it => this.load());
  }

  changeData(value: string): void {
    this.searchBook(value);
  }

  searchBook(value = this.child.value): void {
    console.log('-', value);
    const option = {
      headers: {
        'X-Naver-Client-Id': 'Fq3JkmuDgnVEHXOyWOfk',
        'X-Naver-Client-Secret': 'GbD74HX7qn'
      },
      params: {
        query: value
      }
    } as HttpOption;
    this.apiService.get<OpenApiNaver>(`/openapi-naver/v1/search/book.json`, option).subscribe(it => {
      this.openApiNaver = it;
    });
  }
}
