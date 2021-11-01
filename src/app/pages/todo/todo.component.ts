import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private apiService: ApiService, private alertService: AlertService) { }

  ngOnInit(): void {
    // this.alertService.showProgress('zzzzzzz');
  }

}
