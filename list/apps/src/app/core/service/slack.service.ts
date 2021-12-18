import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable()
export class SlackService {
    constructor(private http: HttpClient) {}
    
    /* slack push 보내기 */
    sendSlackPush(
        message: String | null): Observable<any[]> {
        try {
            let url = `/send`;
			const params = {"text": message}
            const options = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                })
            };
            
			return this.http.post<any[]>(url, params, options).pipe();
		} catch (e) {
			console.log('eeee', e);
            throw new Error("Unexpected object: " + e);
		}
    }
}