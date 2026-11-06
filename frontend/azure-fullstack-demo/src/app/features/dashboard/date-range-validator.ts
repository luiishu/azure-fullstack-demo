const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

export function validateDateRange(
    fromDate: string,
    toDate: string
): boolean {
    if (
        !/^\d{4}-\d{2}-\d{2}$/.test(fromDate) ||
        !/^\d{4}-\d{2}-\d{2}$/.test(toDate)
    ) {
        return false;
    }

    const from = new Date(`${fromDate}T00:00:00Z`);
    const to = new Date(`${toDate}T00:00:00Z`);

    if (
        Number.isNaN(from.getTime()) ||
        Number.isNaN(to.getTime()) ||
        from.toISOString().slice(0, 10) !== fromDate ||
        to.toISOString().slice(0, 10) !== toDate
    ) {
        return false;
    }

    if (from > to) {
        return false;
    }

    const numberOfDays =
        (to.getTime() - from.getTime()) / MILLISECONDS_PER_DAY + 1;

    return numberOfDays <= 31;
}