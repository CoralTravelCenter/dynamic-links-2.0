import {goToOnlyHotelModern} from './goToOnlyHotelModern';
import {formatDate} from "../utils";

export function handleOnlyHotelClick(target: HTMLElement): void {
    const raw = target.getAttribute('data-onlyhotel-lookup-destination');

    if (!raw) {
        console.warn('data-onlyhotel-lookup-destination is required');
        return;
    }

    let hotelNames: string[] = [];

    // Обработка нескольких отелей, разделенных запятыми или точкой с запятой
    if (raw.includes(';')) {
        // Если использована точка с запятой, используем ее как основной разделитель
        hotelNames = raw.split(';').map(s => s.trim()).filter(Boolean);
    } else {
        // Иначе используем запятую как разделитель
        hotelNames = raw.split(',').map(s => s.trim()).filter(Boolean);
    }

    if (!hotelNames.length) {
        console.warn('No valid hotel names provided');
        return;
    }

    const depth = Number(target.getAttribute('data-onlyhotel-lookup-depth-days') ?? 14);
    const nights = Number(target.getAttribute('data-onlyhotel-lookup-nights') ?? 7);
    
    // Поддержка нескольких фильтров, например: "5stars,4stars,ai"
    const filter = target.getAttribute('data-onlyhotel-lookup-filter') ?? null;

    // Можно указать дату начала, иначе используем дефолтное значение
    const startDateStr = target.getAttribute('data-onlyhotel-lookup-start-date');
    let start = new Date();
    
    if (startDateStr) {
        try {
            start = new Date(startDateStr);
            if (isNaN(start.getTime())) {
                // Если дата некорректная, используем текущую дату + depth
                start = new Date();
                start.setDate(start.getDate() + depth);
            }
        } catch {
            start = new Date();
            start.setDate(start.getDate() + depth);
        }
    } else {
        start.setDate(start.getDate() + depth);
    }

    const end = new Date(start);
    end.setDate(end.getDate() + nights);

    const beginDates: [string, string] = [formatDate(start), formatDate(end)];

    console.log(`Looking for hotels: ${hotelNames.join(', ')} with filters: ${filter}`);
    goToOnlyHotelModern(hotelNames, nights, beginDates, filter);
}
