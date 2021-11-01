import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Observable, of } from 'rxjs';
import { finalize, map, mergeMap } from 'rxjs/operators';
import { ValidUtil } from 'src/app/utils/ValidUtil';

export type HttpOption = {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private alertService: AlertService) { }

  // private handleError(error: any) {
  //   // In a real world app, we might use a remote logging infrastructure
  //   // We'd also dig deeper into the error to get a better message
  //   const errMsg = (error.message) ? error.message :
  //     error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  //   console.error(errMsg); // log to console instead
  //   return Observable.throw(errMsg);
  // }


  // public errorHandler(error: HttpErrorResponse | Error, title = 'Request'): void {
  //   if (error instanceof HttpErrorResponse && 200 === error.status && error.url) {
  //     location.href = error.url;
  //     return;
  //   }
  //   this.alertService.progressSpinnerAllOut();
  //   this.alertService.dangerAlertHttpErrorResponse(title, error);
  // }

  public toGetDeleteHttpOption(apiHttpOptions: ApiHttpOption): HttpOption {
    const options: HttpOption = {};
    if (apiHttpOptions.params && apiHttpOptions.params instanceof HttpParams) {
      options.params = apiHttpOptions.params;
    } else if (apiHttpOptions.params) {
      options.params = Object.getOwnPropertyNames(apiHttpOptions.params)
        .reduce((p, key) => {
          const it = apiHttpOptions.params[key];
          if (!ValidUtil.isNullOrUndefined(apiHttpOptions.params[key])) {
            return p.set(key, it);
          } else {
            return p;
          }
        }, new HttpParams());
    }
    if (apiHttpOptions.headers) {
      options.headers = apiHttpOptions.headers;
    }
    return options;
  }

  private toPostPutHttpOption(url: string, apiHttpOption: ApiHttpOption): {url: string, params: any, httpOptions: HttpOption}{
    const options: HttpOption = {};
    apiHttpOption.params = apiHttpOption.params || {};
    if (apiHttpOption.params instanceof FormData) {
      // url += '?_csrf=' + this.getCSRF();
    } else {
      // apiHttpOption.params._csrf = this.getCSRF();
    }
    if (apiHttpOption.headers) {
      options.headers = apiHttpOption.headers;
    }
    return {url, params: apiHttpOption.params, httpOptions: options};
  }

  public get<T>(url: string, options: ApiHttpOption = {}): Observable<T> {
    let pro;
    const httpObservable = this.http.get<T>(url, this.toGetDeleteHttpOption(options));
    const observable = of(true)
      .pipe(
        map(it => {
          return pro = this.alertService.showProgress('get');
        }),
        mergeMap(it => {
          return httpObservable;
        }),
        map(it => {
          try{pro.out(); }catch (e) {}
          return it;
        }),
        finalize(() => {
          try{pro.out(); }catch (e) {}
        }),
      );
    return observable;
  }

  public delete<T>(url: string, options: ApiHttpOption = {}): Observable<T> {
    let pro;
    const httpObservable = this.http.delete<T>(url, this.toGetDeleteHttpOption(options));
    const observable = of(true)
      .pipe(
        map(it => pro = this.alertService.showProgress('delete')),
        mergeMap(it => httpObservable),
        finalize(() => pro.out())
      );
    return observable;
  }

  public post<T>(url: string, options: ApiHttpOption = {}): Observable<T> {
    let pro;
    const optionsSet = this.toPostPutHttpOption(url, options);
    const httpObservable = this.http.post<T>(optionsSet.url, optionsSet.params, optionsSet.httpOptions);
    const observable = of(true)
      .pipe(
        map(it => pro = this.alertService.showProgress('post')),
        mergeMap(it => httpObservable),
        finalize(() => pro.out())
      );
    return observable;
  }

  public put<T>(url: string, options: ApiHttpOption = {}): Observable<T> {
    let pro;
    const optionsSet = this.toPostPutHttpOption(url, options);
    const httpObservable = this.http.put<T>(optionsSet.url, optionsSet.params, optionsSet.httpOptions);
    const observable = of(true)
      .pipe(
        map(it => pro = this.alertService.showProgress('put')),
        mergeMap(it => httpObservable),
        finalize(() => pro.out())
      );
    return observable;
  }

  public patch<T>(url: string, options: ApiHttpOption = {}): Observable<T> {
    let pro;
    const optionsSet = this.toPostPutHttpOption(url, options);
    const httpObservable = this.http.patch<T>(optionsSet.url, optionsSet.params, optionsSet.httpOptions);
    const observable = of(true)
      .pipe(
        map(it => pro = this.alertService.showProgress('patch')),
        mergeMap(it => httpObservable),
        finalize(() => pro.out())
      );
    return observable;
  }

  // public httpClientHandleSuccess(title: string, data: any = {}) {
  //   const code = data.code || 'R00000';
  //   const message = (data.message || MsgCode.R00000);
  //   this.alertService.successAlert(title + '(' + code + ')', message);
  //
  // }
  //
  // public httpClientHandleError(title: string, error: any = {}) {
  //   const code = error.code || 'E99999';
  //   const message = (error.message || MsgCode.E99999);
  //   this.alertService.dangerAlert(title + '(' + code + ')', message);
  // }

}

export type ApiHttpOption = {
  params?: any;
  headers?: HttpHeaders;
};
