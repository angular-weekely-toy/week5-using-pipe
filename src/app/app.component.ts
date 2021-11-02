import { Component, OnInit } from '@angular/core';
import { ApiHttpOption, ApiService } from 'src/app/services/api.service';
import { NavigatorUtil } from 'src/app/utils/NavigatorUtil';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Weather } from './models/openweathermap';
import { AlertService } from './services/alert/alert.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  weather?: Weather;
  constructor(private apiService: ApiService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.alertService.asyncTask(NavigatorUtil.getGeoLocationCurrentPosition()).pipe(
      map(it => ({lat: it.coords.latitude, lon: it.coords.longitude})),
      catchError((err, caught) => of({q: 'Seoul'})),
      mergeMap(it => of({appid: environment.openwaethermapAppId, lang: 'kr', ...it})),
      mergeMap(params => this.apiService.get<Weather>(environment.openwaethermapWeatherUrl, {params}))
    ).subscribe(it => this.weather = it);
  }
}
