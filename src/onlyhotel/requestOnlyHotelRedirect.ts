import {fetchOnlyHotelLocations} from "./fetchOnlyHotelArrivalLocations";
import {fetchPriceSearchEncrypt} from "./fetchPriceSearchEncrypt";
import {reservationTypeParam} from "../constants";

export async function requestOnlyHotelRedirect(
    hotelNames: string[],
    dates: string[],
    nights: number,
    filters: string | null,
) {
    const locations = await fetchOnlyHotelLocations(hotelNames);
    const qp = await fetchPriceSearchEncrypt(locations, dates, nights, filters);

    const {redirectionUrl, queryParam} = qp.result;
    return `${redirectionUrl}?qp=${queryParam}${reservationTypeParam.onlyHotel}`;
}
