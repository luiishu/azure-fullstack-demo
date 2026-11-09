
import { validateDateRange } from './date-range-validator';

describe('validateDateRange', () => {

    describe('date comparison', () => {
        it('should return true if fromDate equals toDate', () => {
            expect(validateDateRange('2026-04-20', '2026-04-20')).toBe(true);
        });

        it('should return true if fromDate is before toDate', () => {
            expect(validateDateRange('2026-04-20', '2026-04-21')).toBe(true);
        });

        it('should return false if fromDate is after toDate', () => {
            expect(validateDateRange('2026-04-21', '2026-04-20')).toBe(false);
        });
    });

    describe('input validation', () => {
        it('should return false if fromDate is empty', () => {
            expect(validateDateRange('', '2026-04-20')).toBe(false);
        });

        it('should return false if toDate is empty', () => {
            expect(validateDateRange('2026-04-20', '')).toBe(false);
        });

        it('should return false if both dates are empty', () => {
            expect(validateDateRange('', '')).toBe(false);
        });
    });


    describe('date format validation', () => {
        it('should return false if fromDate has an invalid format', () => {
            expect(validateDateRange('20260-04-20', '2026-04-21')).toBe(false);
        });

        it('should return false if toDate has an invalid format', () => {
            expect(validateDateRange('2026-04-20', '2026-32-20')).toBe(false);
        });
    });

    describe('calendar date validation', () => {
        it('should return false if fromDate is an invalid calendar date', () => {
            expect(validateDateRange('2026-02-30', '2026-04-20')).toBe(false);
        });

        it('should return false if toDate is an invalid calendar date', () => {
            expect(validateDateRange('2026-04-20', '2026-02-30')).toBe(false);
        });
    });

    describe('date range length', () => {
        it('should return true if the date range is 31 days or less', () => {
            expect(validateDateRange('2026-01-01', '2026-01-01')).toBe(true);
            expect(validateDateRange('2026-01-01', '2026-01-15')).toBe(true);
            expect(validateDateRange('2026-01-01', '2026-01-31')).toBe(true);
        });

        it('should return false if the date range exceeds 31 days', () => {
            expect(validateDateRange('2026-01-01', '2026-02-01')).toBe(false);
            expect(validateDateRange('2026-01-01', '2026-04-20')).toBe(false);
        });
    });
});