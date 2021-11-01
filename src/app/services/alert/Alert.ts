import { AlertService } from './alert.service';

export abstract class Alert {
  public item: HTMLDivElement;
  private alertContainer?: HTMLDivElement;
  private itemClassName = 'alert-item';

  constructor(public alertService: AlertService) {
    this.item = document.createElement('div');
    this.item.classList.add(this.itemClassName, this.getContainerClass(), 'd-flex', 'align-items-center', 'bg-opacity-25', 'p-2');
  }

  public open(): Alert {
    this.item.innerHTML = '';
    this.item.append(this.getContainerContent());
    this.alertContainer = this.alertService.getAlertContainer();
    this.alertContainer.append(this.item);
    this.alertContainer.style.display = 'block';
    if (this.getAfterCloseTime()) {
      setTimeout(() => {
        this.item.remove();
        if (this.alertContainer) {
          if (!this.alertContainer.querySelector(`.${this.itemClassName}`)) {
            this.alertContainer.style.display = 'none';
          }
        }
      }, this.getAfterCloseTime());
    }
    return this;
  }

  public close() {
    this.item.remove();
    if (this.alertContainer) {
      if (!this.alertContainer.querySelector(`.${this.itemClassName}`)) {
        this.alertContainer.style.display = 'none';
      }
    }
  };

  abstract getAfterCloseTime(): number;

  abstract getContainerClass(): string;

  abstract getContainerContent(): Element | DocumentFragment;
}
