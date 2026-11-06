import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';

@Service()
export class DevService {
    private http = inject(HttpClient);
    private apiBaseUrl = environment.api.baseUrl;

    public getGreeting() {
        return this.http.get(`${this.apiBaseUrl}`, {
            responseType: 'text'
        });
    }    
}
