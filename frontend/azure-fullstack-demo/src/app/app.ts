import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from './shared/auth/auth-service';


@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  // styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private msalService = inject(MsalService);
  private authService = inject(AuthService);
  private router = inject(Router);

  protected readonly title = signal('azure-fullstack-demo');

  ngOnInit(): void {
    this.msalService.handleRedirectObservable().subscribe({
      next: (result) => {
        if (result?.account) {
          // Successful login
          this.msalService.instance.setActiveAccount(result.account);
          this.authService.setAccount(result.account);

          this.router.navigate(['/']);
        }
        else {
          // Existing session / page refresh
          const accounts = this.msalService.instance.getAllAccounts();
          const account = accounts.length > 0 ? accounts[0] : null;

          if (account) {
            this.msalService.instance.setActiveAccount(account);
          }
          this.authService.setAccount(account);
        }
      },
      error: (error) => {
        console.error('Redirect handling failed:', error);
      }
    });

    console.log('Active:', this.msalService.instance.getActiveAccount());
    console.log('All:', this.msalService.instance.getAllAccounts());
  }
}