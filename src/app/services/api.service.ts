import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map, mergeMap } from 'rxjs/operators';
import { ValidUtil } from 'src/app/utils/ValidUtil';
import { Alert } from 'src/app/services/alert/Alert';

export type HttpOption = {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body' | 'events' | 'response';
  params?: HttpParams | {
    [param: string]: string | string[] | number | number[];
  };
  reportProgress?: boolean;
  responseType?: 'json' | 'text' | 'arraybuffer' | 'blob' | 'document' | 'json' | 'text';
  withCredentials?: boolean;
  noAlertProgress?: boolean;
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private alertService: AlertService) { }

  public get<T>(url: string, options: HttpOption = {}): Observable<T> {
    let pro: Alert;
    const httpObservable = this.http.get<T>(url, options as any);
    const observable = of(options.noAlertProgress ? false : pro = this.alertService.showProgress('get'))
      .pipe(
        mergeMap(it => {
          return httpObservable;
        }),
        finalize(() => {
          try{pro?.close(); }catch (e) {}
        }),
      );
    return observable as unknown as Observable<T>;
  }

  public delete<T>(url: string, options: HttpOption = {}): Observable<T> {
    let pro: Alert;
    const httpObservable = this.http.delete<T>(url, options as any);
    const observable = of(options.noAlertProgress ? false : pro = this.alertService.showProgress('delete'))
      .pipe(
        mergeMap(it => httpObservable),
        finalize(() => pro.close())
      );
    return observable as unknown as Observable<T>;
  }
  //
  public post<T>(url: string, body: any, options: HttpOption = {}): Observable<T> {
    let pro: Alert;
    const httpObservable = this.http.post<T>(url, body, options as any);
    const observable = of(options.noAlertProgress ? false : pro = this.alertService.showProgress('post'))
      .pipe(
        mergeMap(it => httpObservable),
        finalize(() => pro.close())
      );
    return observable as unknown as Observable<T>;
  }
  //
  public put<T>(url: string, body: any, options: HttpOption = {}): Observable<T> {
    let pro: Alert;
    const httpObservable = this.http.put<T>(url, body, options as any);
    const observable = of(options.noAlertProgress ? false : pro = this.alertService.showProgress('put'))
      .pipe(
        mergeMap(it => httpObservable),
        finalize(() => pro.close())
      );
    return observable as unknown as Observable<T>;
  }
  //
  // public patch<T>(url: string, options: ApiHttpOption = {}): Observable<T> {
  //   let pro;
  //   const optionsSet = this.toPostPutHttpOption(url, options);
  //   const httpObservable = this.http.patch<T>(optionsSet.url, optionsSet.params, optionsSet.httpOptions);
  //   const observable = of(true)
  //     .pipe(
  //       map(it => pro = this.alertService.showProgress('patch')),
  //       mergeMap(it => httpObservable),
  //       finalize(() => pro.out())
  //     );
  //   return observable;
  // }


}

