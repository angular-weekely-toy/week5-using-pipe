import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'week1-todo-list';
  weather = '';
  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.get('https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=58f4c27fb2b2f7d62632137530013fb3&lang=kr')
      .subscribe(it => {
      this.weather = ((it as any).weather[0].description);
    });
  }
}
