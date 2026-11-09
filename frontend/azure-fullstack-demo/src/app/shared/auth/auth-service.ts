import { Injectable, computed, inject, signal } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private msalService = inject(MsalService);

    private account = signal<AccountInfo | null>(
        this.msalService.instance.getActiveAccount()
    );

    readonly user = this.account.asReadonly();
    readonly isLoggedIn = computed(() => this.account() !== null);

    setAccount(account: AccountInfo | null): void {
        this.account.set(account);
    }

    login(): void {
        this.msalService.loginRedirect().subscribe({
            error: error => console.error('Login failed:', error)
        });
    }

    logout(): void {
        // this.msalService.logoutRedirect({
        //     account: this.user ?? undefined
        // }).subscribe({
        //     error: error => console.error('Logout failed:', error)
        // });
       
        this.msalService.logoutRedirect().subscribe({
            error: error => console.error('Logout failed:', error)
        });
    }
}