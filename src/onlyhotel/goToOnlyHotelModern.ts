import {fetchOnlyHotelLocations} from './fetchOnlyHotelLocations';
import {buildOnlyHotelPayload} from './buildOnlyHotelPayload';
import {requestOnlyHotelRedirect} from './requestOnlyHotelRedirect';

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

    payload = buildOnlyHotelPayload(hotels, nights, beginDates, filter);
    url = await requestOnlyHotelRedirect(payload);

    window.open(url, '_blank');
}
