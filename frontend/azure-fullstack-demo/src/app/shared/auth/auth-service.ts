
import { Injectable, inject, signal } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';

import {
    AccountInfo,
    InteractionStatus
} from '@azure/msal-browser';

import { filter } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private msalService = inject(MsalService);
    private msalBroadcastService = inject(MsalBroadcastService);

    private account = signal<AccountInfo | null>(null);

    readonly isLoggedIn = () => this.account() !== null;
    readonly user = this.account.asReadonly();

    constructor() {
        this.msalBroadcastService.inProgress$
            .pipe(
                filter(status => status === InteractionStatus.None)
            )
            .subscribe(() => {
                this.updateAccount();
            });
    }

    private updateAccount(): void {
        let activeAccount = this.msalService.instance.getActiveAccount();

        if (!activeAccount) {
            const accounts = this.msalService.instance.getAllAccounts();

            if (accounts.length > 0) {
                activeAccount = accounts[0];
                this.msalService.instance.setActiveAccount(activeAccount);
            }
        }

        this.account.set(activeAccount);
    }

    login(): void {
        this.msalService.loginRedirect().subscribe({
            error: error => console.error('Login failed:', error)
        });
    }

    logout(): void {
        this.msalService.logoutRedirect({
            account: this.account() ?? undefined
        });
    }
}