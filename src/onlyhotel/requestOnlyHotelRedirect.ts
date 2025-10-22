import {fetchOnlyHotelLocations} from "./fetchOnlyHotelArrivalLocations";
import {fetchPriceSearchEncrypt} from "./fetchPriceSearchEncrypt";
import {RESERVATION_TYPE_PARAMS} from "../constants";

/**
 * Генерирует URL редиректа OnlyHotel:
 * 1) резолвит локации по отелям/стране,
 * 2) шифрует запрос (server-side),
 * 3) возвращает готовый URL с qp и типом бронирования.
 */
export async function requestOnlyHotelRedirect(
    hotelNames: string[],
    dates: [string, string],
    nights: number,
    filters: Record<string, unknown> | { raw: string } | null,
): Promise<string> {
    if (!Array.isArray(hotelNames) || hotelNames.length === 0) {
        throw new Error("hotelNames array cannot be empty");
    }
    if (!Array.isArray(dates) || dates.length !== 2 || !dates[0] || !dates[1]) {
        throw new Error("dates must be a tuple ['YYYY-MM-DD','YYYY-MM-DD']");
    }
    if (!Number.isFinite(nights) || nights <= 0) {
        throw new Error("nights must be a positive number");
    }

    const locations = await fetchOnlyHotelLocations(hotelNames);
    const searchResponse = await fetchPriceSearchEncrypt(locations, dates, nights, filters);

    const {redirectionUrl, queryParam} = searchResponse.result ?? {};
    if (!redirectionUrl || !queryParam) {
        throw new Error("Invalid response: missing redirection URL or query parameter");
    }

    return `${redirectionUrl}?qp=${queryParam}${RESERVATION_TYPE_PARAMS.onlyHotel}`;
}
