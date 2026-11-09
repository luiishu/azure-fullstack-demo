import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth-service';
import { AccountInfo } from '@azure/msal-browser';
import { MsalService } from '@azure/msal-angular';

describe('AuthService', () => {
    let authService: AuthService;
    let activeAccount: AccountInfo | null;

    // beforeEach(() => {
    //   TestBed.configureTestingModule({});
    //   authService = TestBed.inject(AuthService);
    // });

    //   it('should be created', () => {
    //     expect(service).toBeTruthy();
    //   });

    const mockAccount = {
        homeAccountId: 'test-home-account',
        environment: 'login.microsoftonline.com',
        tenantId: 'test-tenant',
        username: 'test@example.com',
        localAccountId: 'test-local-account'
    } as AccountInfo;

    beforeEach(() => {
        activeAccount = null;

        const msalServiceMock = {
            instance: {
                getActiveAccount: () => activeAccount
            }
        } as unknown as MsalService;

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: MsalService,
                    useValue: msalServiceMock
                }
            ]
        });
    });

    it('should initialize as logged out when no active account exists', () => {
        authService = TestBed.inject(AuthService);

        expect(authService.isLoggedIn()).toBe(false);
        expect(authService.user()).toBeNull();
    });

    it('should initialize as logged in when an active account exists', () => {
        activeAccount = mockAccount;

        authService = TestBed.inject(AuthService);

        expect(authService.isLoggedIn()).toBe(true);
        expect(authService.user()).toEqual(mockAccount);
    });

    it('should update authentication state when setAccount is called', () => {
        authService = TestBed.inject(AuthService);

        authService.setAccount(mockAccount);

        expect(authService.isLoggedIn()).toBe(true);
        expect(authService.user()).toEqual(mockAccount);

        authService.setAccount(null);

        expect(authService.isLoggedIn()).toBe(false);
        expect(authService.user()).toBeNull();
    });
});
