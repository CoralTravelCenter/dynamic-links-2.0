import { doRequestToServer, PACKAGE_ENDPOINTS } from "../api";
import {
	ArrivalLocation,
	OnlyHotelPriceSearchEncryptResponse,
	OnlyHotelPriceSearchEncryptPayload,
} from "../types";
import { addFilters } from "../utils";
import { API_CONFIG, DEPARTURE_ID } from "../constants";

/**
 * Создает payload для поиска пакетных туров по странам
 */
function buildPayloadForPackage(
	locations: ArrivalLocation[],
	dates: string[],
	nights: number,
	filters: string | null,
): OnlyHotelPriceSearchEncryptPayload {
	return {
		beginDates: dates,
		arrivalLocations: locations,
		nights: [{ value: nights }],
		roomCriterias: [
			{
				passengers: [...API_CONFIG.DEFAULT_PASSENGERS],
			},
		],
		reservationType: 1, // 1 = Package (отличается от OnlyHotel)
		paging: {
			pageNumber: 1,
			pageSize: API_CONFIG.DEFAULT_PAGE_SIZE,
			sortType: API_CONFIG.DEFAULT_SORT_TYPE,
		},
		additionalFilters: addFilters(filters),
		imageSizes: [...API_CONFIG.DEFAULT_IMAGE_SIZES],
		categories: [],
		departureLocations: [DEPARTURE_ID], // Москва как город отправления
	};
}

/**
 * Получает зашифрованные данные поиска цен для бронирования пакетных туров
 *
 * @param locations - Массив локаций прибытия (обычно страны)
 * @param dates - Массив дат поиска в формате YYYY-MM-DD
 * @param nights - Количество ночей для проживания
 * @param filters - Опциональная строка фильтров через запятую
 * @returns Promise, разрешающийся в ответ с зашифрованным поиском цен
 * @throws Error если массив локаций пуст или API запрос не удался
 */
export async function fetchPackagePriceSearchEncrypt(
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

	const payload = buildPayloadForPackage(locations, dates, nights, filters);

	return await doRequestToServer<
		OnlyHotelPriceSearchEncryptResponse,
		OnlyHotelPriceSearchEncryptPayload
	>(PACKAGE_ENDPOINTS.PRICE_SEARCH_ENCRYPT, payload, "POST");
}
