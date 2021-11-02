import { Injectable } from '@angular/core';
import { AlertProgress } from 'src/app/services/alert/AlertProgress';
import { AlertPrimary } from 'src/app/services/alert/AlertPrimary';
import { AlertSuccess } from 'src/app/services/alert/AlertSuccess';
import { AlertWarning } from 'src/app/services/alert/AlertWarning';
import { AlertDanger } from 'src/app/services/alert/AlertDanger';
import { Alert } from 'src/app/services/alert/Alert';
import { Observable, of } from 'rxjs';
import { finalize, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  progressTask<T>(observable: Observable<T>, title = 'task'): Observable<T> {
    let pro: Alert;
    return of(true).pipe(
        map(it => {
          return pro = this.showProgress(title);
        }),
        mergeMap(it => {
          return observable;
        }),
        map(it => {
          try{pro.close(); }catch (e) {}
          return it;
        }),
        finalize(() => {
          try{pro.close(); }catch (e) {}
        })
      );
  }

  public progress(msg: string): Alert {
    return new AlertProgress(msg, this);
  }

  public showProgress(msg: string): Alert {
    return new AlertProgress(msg, this).open();
  }

  public showPrimary(msg: string): Alert {
    return new AlertPrimary(msg, this).open();
  }

  public showSuccess(msg: string): Alert {
    return new AlertSuccess(msg, this).open();
  }

  public showWarning(msg: string): Alert {
    return new AlertWarning(msg, this).open();
  }

  public showDanger(msg: string): Alert {
    return new AlertDanger(msg, this).open();
  }

  public getAlertContainer(): HTMLDivElement {
    const id = 'alert-container';
    let container = document.querySelector(`#${id}`) as HTMLDivElement;
    if (!container) {
      container = document.createElement('div');
      container.id = id;
      container.style.position = 'fixed';
      container.style.left = '100%';
      container.style.top = '50px';
      container.style.transform = 'translate(-100%)';
      // container.style.backgroundColor = 'rgba(51,51,51,0.4)';
      // container.style.marginRight = '20px';
      container.style.minWidth = '150px';
      // container.style.minHeight = '100vh'
      container.style.zIndex = '9999';
      // container.innerHTML = ``
      document.body.prepend(container);
    }
    // (container as HTMLDivElement).style.display = 'block';
    return container;
  }

  public closeAllProgressModal(): void {
    document.querySelectorAll('.progress-modal').forEach(it => it.remove());
  }
}
