import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from '../../../shared/auth/auth-service';

@Component({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule
],
  selector: 'app-welcome-page',
  styleUrl: './welcome-page.scss',
  templateUrl: './welcome-page.html',
})
export class WelcomePage {
  private msalService = inject(MsalService);
  public authService = inject(AuthService);
  private readonly router = inject(Router);

  public login() {
    // console.log('☑️ Login sucessful! Navigating user to: /dashboard');
    // this.router.navigate(['/dashboard']);
    this.msalService.loginRedirect();
  }
}
