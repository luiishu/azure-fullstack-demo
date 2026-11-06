import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface KpiResponse {
    todosCount: number;
    completedTodosCount: number;
    incompletedTodosCount: number;
}

@Service()
export class KpiService {
    private http = inject(HttpClient);
    private apiBaseUrl = environment.api.baseUrl;

    public getGreeting() {
        return this.http.get(`${this.apiBaseUrl}`, {
            responseType: 'text'
        });
    }

    public getKpis(fromDate: string, toDate: string) {
        let queryParameters = new HttpParams();

        if (fromDate) {
            queryParameters = queryParameters.set('fromDate', fromDate);
        }

        if (toDate) {
            queryParameters =   queryParameters.set('toDate', toDate);
        }

        return this.http.get<KpiResponse>(`${this.apiBaseUrl}/kpis`, {
            params: {
                fromDate,
                toDate
            }
        });
    }
}