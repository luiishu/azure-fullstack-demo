import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth-service';
import { AccountInfo } from '@azure/msal-browser';
import { MsalService } from '@azure/msal-angular';

describe('service', () => {
    let service: AuthService;
    let activeAccount: AccountInfo | null;

    // beforeEach(() => {
    //   TestBed.configureTestingModule({});
    //   service = TestBed.inject(AuthService);
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
        service = TestBed.inject(AuthService);

        expect(service.isLoggedIn()).toBe(false);
        expect(service.user()).toBeNull();
    });

    it('should initialize as logged in when an active account exists', () => {
        activeAccount = mockAccount;

        service = TestBed.inject(AuthService);

        expect(service.isLoggedIn()).toBe(true);
        expect(service.user()).toEqual(mockAccount);
    });

    it('should update authentication state when setAccount is called', () => {
        service = TestBed.inject(AuthService);

        service.setAccount(mockAccount);

        expect(service.isLoggedIn()).toBe(true);
        expect(service.user()).toEqual(mockAccount);

        service.setAccount(null);

        expect(service.isLoggedIn()).toBe(false);
        expect(service.user()).toBeNull();
    });
});
