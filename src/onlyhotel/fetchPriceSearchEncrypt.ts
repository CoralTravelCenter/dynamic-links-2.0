import {doRequestToServer, ONLY_HOTEL_ENDPOINTS} from "../api";
import {API_CONFIG, ONLYHOTEL_API_CONFIG} from "../constants";
import {
    ArrivalLocation,
    isHotelLocation,
    OnlyHotelPriceSearchEncryptPayload,
    OnlyHotelPriceSearchEncryptResponse,
} from "../types";
import {addFilters} from "../utils";

/**
 * Создает payload для поиска по конкретным отелям
 */
function buildPayloadForHotel(
    locations: ArrivalLocation[],
    dates: string[],
    nights: number,
    filters: string | null,
): OnlyHotelPriceSearchEncryptPayload {
    const isAdditionalFilters = filters !== null ? addFilters(filters) : [];

    return {
        beginDates: dates,
        arrivalLocations: locations,
        nights: [{value: nights}],
        roomCriterias: [
            {
                passengers: [...API_CONFIG.DEFAULT_PASSENGERS],
            },
        ],
        reservationType: ONLYHOTEL_API_CONFIG.DEFAULT_RESERVATION_TYPE,
        paging: {
            pageNumber: 1,
            pageSize: API_CONFIG.DEFAULT_PAGE_SIZE,
            sortType: API_CONFIG.DEFAULT_SORT_TYPE,
        },
        additionalFilters: isAdditionalFilters,
        imageSizes: [...API_CONFIG.DEFAULT_IMAGE_SIZES],
        categories: [],
    };
}

/**
 * Создает payload для поиска по странам
 */
function buildPayloadForCountry(
    locations: ArrivalLocation[],
    dates: string[],
    nights: number,
    filters: string | null,
): OnlyHotelPriceSearchEncryptPayload {
    const isAdditionalFilters = filters !== null ? addFilters(filters) : [];
    return {
        beginDates: dates,
        arrivalLocations: locations,
        nights: [{value: nights}],
        roomCriterias: [
            {
                passengers: [...API_CONFIG.DEFAULT_PASSENGERS],
            },
        ],
        reservationType: ONLYHOTEL_API_CONFIG.DEFAULT_RESERVATION_TYPE,
        paging: {
            pageNumber: 1,
            pageSize: API_CONFIG.DEFAULT_PAGE_SIZE,
            sortType: API_CONFIG.DEFAULT_SORT_TYPE,
        },
        additionalFilters: isAdditionalFilters,
        imageSizes: [...API_CONFIG.DEFAULT_IMAGE_SIZES],
        categories: [],
    };
}

/**
 * Получает зашифрованные данные поиска цен для бронирования OnlyHotel
 *
 * @param locations - Массив локаций прибытия (отели или страны)
 * @param dates - Массив дат поиска в формате YYYY-MM-DD
 * @param nights - Количество ночей для проживания
 * @param filters - Опциональная строка фильтров через запятую
 * @returns Promise, разрешающийся в ответ с зашифрованным поиском цен
 * @throws Error если массив локаций пуст или API запрос не удался
 */
export async function fetchPriceSearchEncrypt(
    locations: ArrivalLocation[],
    dates: string[],
    nights: number,
    filters: string | null,
): Promise<OnlyHotelPriceSearchEncryptResponse> {
    if (!locations.length) {
        throw new Error("Locations array cannot be empty");
    }

    if (!dates.length) {
        throw new Error("Dates array cannot be empty");
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
