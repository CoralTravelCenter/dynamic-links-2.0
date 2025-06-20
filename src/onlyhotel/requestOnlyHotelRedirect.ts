import {fetchOnlyHotelLocations} from "./fetchOnlyHotelArrivalLocations";
import {fetchPriceSearchEncrypt} from "./fetchPriceSearchEncrypt";

export async function requestOnlyHotelRedirect(
    hotelNames: string[],
    dates: string[],
    nights: number,
    filters: string | null,
) {
    const locations = await fetchOnlyHotelLocations(hotelNames);
    console.log(locations)
    const qp = await fetchPriceSearchEncrypt(locations, dates, nights, filters);
    console.log(qp);

    const {redirectionUrl, queryParam} = qp.result;
    return `${redirectionUrl}?qp=${queryParam}`;
}
