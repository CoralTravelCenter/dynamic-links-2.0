import {goToOnlyHotelModern} from './goToOnlyHotelModern';
import {formatDate} from "../utils";

export function handleOnlyHotelClick(target: HTMLElement): void {
    const raw = target.getAttribute('data-onlyhotel-lookup-destination');

    if (!raw) {
        console.warn('data-onlyhotel-lookup-destination is required');
        return;
    }

    let hotelNames: string[] = [];

    hotelNames = raw.split(',').map(s => s.trim()).filter(Boolean);

    if (!hotelNames.length) {
        console.warn('No valid hotel names provided');
        return;
    }

    const depth = Number(target.getAttribute('data-onlyhotel-lookup-depth-days') ?? 14);
    const nights = Number(target.getAttribute('data-onlyhotel-lookup-nights') ?? 7);
    const filter = target.getAttribute('data-onlyhotel-lookup-filter') ?? null;

    const start = new Date();
    start.setDate(start.getDate() + depth);

    const end = new Date(start);
    end.setDate(end.getDate() + nights);

    const beginDates: [string, string] = [formatDate(start), formatDate(end)];

    goToOnlyHotelModern(hotelNames, nights, beginDates, filter);
}
