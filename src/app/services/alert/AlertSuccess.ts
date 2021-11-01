import { AlertService } from './alert.service';
import { Alert } from './Alert';


export class AlertSuccess extends Alert {
    constructor(public msg: string, alertService: AlertService, public closeTime = 400) {
        super(alertService);
    }

    getAfterCloseTime(): number {
        return this.closeTime;
    }

    getContainerClass(): string {
        return 'alert-success';
    }
    getContainerContent(): Element | DocumentFragment {
        const template = document.createElement('template')
        template.innerHTML = `
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
            <div>${this.msg}<div>
        `
        return template.content;
    }
}
