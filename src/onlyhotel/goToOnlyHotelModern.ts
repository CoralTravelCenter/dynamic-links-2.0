import {fetchOnlyHotelLocations} from './fetchOnlyHotelLocations';
import {buildOnlyHotelPayload} from './buildOnlyHotelPayload';
import {buildMultipleHotelsPayload} from './buildMultipleHotelsPayload';
import {requestOnlyHotelRedirect} from './requestOnlyHotelRedirect';
import {requestMultipleHotelsRedirect} from './requestMultipleHotelsRedirect';

export async function goToOnlyHotelModern(
    hotelNames: string[],
    nights: number,
    beginDates: string[],
    filter: string | null = null
): Promise<void> {
    if (!hotelNames.length) return;

    const hotels = await fetchOnlyHotelLocations(hotelNames);
    if (!hotels.length) {
        console.warn('No matching hotel locations found');
        return;
    }

    let payload;
    let url;

    // Если несколько отелей, используем другой API и формат payload
    if (hotels.length > 1) {
        payload = buildMultipleHotelsPayload(hotels, nights, beginDates, filter);
        console.log('Multiple hotels payload:', payload);
        url = await requestMultipleHotelsRedirect(payload);
    } else {
        payload = buildOnlyHotelPayload(hotels, nights, beginDates, filter);
        console.log('Single hotel payload:', payload);
        url = await requestOnlyHotelRedirect(payload);
    }

    window.open(url, '_blank');
}
