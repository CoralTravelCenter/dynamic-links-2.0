import {doRequestToServer, ONLY_HOTEL_ENDPOINTS} from "../api";
import {
    ArrivalLocation,
    isHotelLocation,
    OnlyHotelPriceSearchEncryptPayload,
    OnlyHotelPriceSearchEncryptResponse,
} from "../types";
import {addFilters} from "../utils";
import {API_CONFIG} from "../constants";

/**
 * Создаёт payload для поиска по конкретным отелям (type=7)
 */
function buildPayloadForHotel(
    locations: ArrivalLocation[],
    dates: [string, string],
    nights: number,
    filters: Record<string, unknown> | { raw: string } | null,
): OnlyHotelPriceSearchEncryptPayload {
    const [startDate, endDate] = dates;
    return {
        searchSource: 0,
        searchCriterias: {
            beginDates: [startDate, endDate],
            arrivalLocations: locations,
            nights: [{value: nights}],
            roomCriterias: [
                {passengers: [{age: 20, passengerType: 0}, {age: 20, passengerType: 0}]},
            ],
            reservationType: 2, // OnlyHotel
            filters: addFilters(filters ?? {}),
            paging: {pageNumber: 1, pageSize: API_CONFIG?.DEFAULT_PAGE_SIZE ?? 50},
        },
    };
}

/**
 * Создаёт payload для поиска по стране (type=0)
 */
function buildPayloadForCountry(
    locations: ArrivalLocation[],
    dates: [string, string],
    nights: number,
    filters: Record<string, unknown> | { raw: string } | null,
): OnlyHotelPriceSearchEncryptPayload {
    const [startDate, endDate] = dates;
    return {
        searchSource: 0,
        searchCriterias: {
            beginDates: [startDate, endDate],
            arrivalLocations: locations,
            nights: [{value: nights}],
            roomCriterias: [
                {passengers: [{age: 20, passengerType: 0}, {age: 20, passengerType: 0}]},
            ],
            reservationType: 2, // OnlyHotel
            filters: addFilters(filters ?? {}),
            paging: {pageNumber: 1, pageSize: API_CONFIG?.DEFAULT_PAGE_SIZE ?? 50},
        },
    };
}

/**
 * Шифрует поисковый запрос для OnlyHotel:
 * - принимает уже разрешённые arrivalLocations
 * - принимает period как ['YYYY-MM-DD','YYYY-MM-DD']
 */
export async function fetchPriceSearchEncrypt(
    locations: ArrivalLocation[],
    dates: [string, string],
    nights: number,
    filters: Record<string, unknown> | { raw: string } | null,
): Promise<OnlyHotelPriceSearchEncryptResponse> {
    if (!Array.isArray(locations) || locations.length === 0) {
        throw new Error("locations array cannot be empty");
    }
    if (!Array.isArray(dates) || dates.length !== 2 || !dates[0] || !dates[1]) {
        throw new Error("dates must be a tuple ['YYYY-MM-DD','YYYY-MM-DD']");
    }
    if (!Number.isFinite(nights) || nights <= 0) {
        throw new Error("nights must be a positive number");
    }

    const hasHotelLocation = locations.some(isHotelLocation);

    const payload = hasHotelLocation
        ? buildPayloadForHotel(locations, dates, nights, filters)
        : buildPayloadForCountry(locations, dates, nights, filters);

    return await doRequestToServer<
        OnlyHotelPriceSearchEncryptResponse,
        OnlyHotelPriceSearchEncryptPayload
    >(ONLY_HOTEL_ENDPOINTS.PRICE_SEARCH_ENCRYPT, payload, "POST");
}
