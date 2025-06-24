import { fetchPackageLocations } from "./fetchPackageArrivalLocations";
import { fetchPackagePriceSearchEncrypt } from "./fetchPriceSearchEncrypt";
import { reservationTypeParam } from "../constants";

/**
 * Запрашивает URL для редиректа пакетных туров, получая локации и генерируя зашифрованный поисковый запрос
 *
 * @param destination - Название страны или региона для поиска
 * @param dates - Массив дат поиска в формате YYYY-MM-DD
 * @param nights - Количество ночей для проживания
 * @param filters - Опциональная строка фильтров через запятую
 * @returns Promise, разрешающийся в полный URL редиректа с параметрами запроса
 * @throws Error если не удается получить локации или зашифровать поиск
 */
export async function requestPackageRedirect(
	destination: string,
	dates: [string, string],
	nights: number,
	filters: string | null,
): Promise<string> {
	if (!destination || !destination.trim()) {
		throw new Error("Destination cannot be empty");
	}

	if (!dates.length || dates.length !== 2) {
		throw new Error("Dates must be a tuple with exactly 2 elements");
	}

	const locations = await fetchPackageLocations(destination);
	const searchResponse = await fetchPackagePriceSearchEncrypt(
		locations,
		dates,
		nights,
		filters,
	);

	const { redirectionUrl, queryParam } = searchResponse.result;

	if (!redirectionUrl || !queryParam) {
		throw new Error(
			"Invalid response: missing redirection URL or query parameter",
		);
	}

	return `${redirectionUrl}?qp=${queryParam}${reservationTypeParam.package}`;
}
