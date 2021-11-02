import { Component, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../models/todo';
import {EventEmitter} from '@angular/core';
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: Todo;
  @Output() delete = new EventEmitter<string>();
  @Output() update = new EventEmitter<Todo>();

  constructor() {
  }

  ngOnInit(): void {
  }

  changeSuccess($event: Event): void {
    if (($event.currentTarget as HTMLInputElement).checked) {
      this.todo.successDate = new Date().toISOString();
    } else {
      this.todo.successDate = '';
    }
  }
}
