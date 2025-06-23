import { fetchOnlyHotelLocations } from "./fetchOnlyHotelArrivalLocations";
import { fetchPriceSearchEncrypt } from "./fetchPriceSearchEncrypt";
import { reservationTypeParam } from "../constants";

/**
 * Запрашивает URL для редиректа OnlyHotel, получая локации и генерируя зашифрованный поисковый запрос
 *
 * @param hotelNames - Массив названий отелей для поиска
 * @param dates - Массив дат поиска в формате YYYY-MM-DD
 * @param nights - Количество ночей для проживания
 * @param filters - Опциональная строка фильтров через запятую
 * @returns Promise, разрешающийся в полный URL редиректа с параметрами запроса
 * @throws Error если не удается получить локации или зашифровать поиск
 */
export async function requestOnlyHotelRedirect(
	hotelNames: string[],
	dates: string[],
	nights: number,
	filters: string | null,
): Promise<string> {
	if (!hotelNames.length) {
		throw new Error("Hotel names array cannot be empty");
	}

	if (!dates.length) {
		throw new Error("Dates array cannot be empty");
	}

	const locations = await fetchOnlyHotelLocations(hotelNames);
	const searchResponse = await fetchPriceSearchEncrypt(locations, dates, nights, filters);

	const { redirectionUrl, queryParam } = searchResponse.result;

	if (!redirectionUrl || !queryParam) {
		throw new Error("Invalid response: missing redirection URL or query parameter");
	}

	return `${redirectionUrl}?qp=${queryParam}${reservationTypeParam.onlyHotel}`;
}
