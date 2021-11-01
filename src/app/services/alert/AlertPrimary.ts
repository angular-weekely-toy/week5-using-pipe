import { AlertService } from './alert.service';
import { Alert } from './Alert';


export class AlertPrimary extends Alert {
    constructor(public msg: string, alertService: AlertService, public closeTime = 400) {
        super(alertService);
    }

    getAfterCloseTime(): number {
        return this.closeTime;
    }

    getContainerClass(): string {
        return 'alert-primary';
    }
    getContainerContent(): Element | DocumentFragment {
        const template = document.createElement('template')
        template.innerHTML = `
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
            </svg>
            <div>${this.msg}<div>
        `
        return template.content;
    }
}
