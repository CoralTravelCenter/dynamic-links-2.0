import {fetchPackageArrivalLocations} from "./fetchPackageArrivalLocations";
import {fetchPackageAvailableDates} from "./fetchPackageAvailableDates";
import {fetchPackageAvailableNights} from "./fetchPackageAvailableNights";
import {fetchPackagePriceSearchEncrypt} from "./fetchPackagePriceSearchEncrypt";
import {RESERVATION_TYPE_PARAMS} from "../constants";
import {Filter} from "../types";

/**
 * Запрашивает URL для редиректа PackageTour, проходя через полную цепочку запросов:
 * - arrival locations
 * - available dates
 * - available nights
 * - price search encrypt
 *
 * @param destinationNames - Массив названий стран или регионов
 * @param dates - Даты в формате YYYY-MM-DD
 * @param nights - Кол-во ночей
 * @param filters - Строка фильтров
 */
export async function requestPackageRedirect(
    destinationNames: string[],
    dates: string[],
    nights: number,
    filters: Filter[],
): Promise<string> {
    if (!destinationNames.length) {
        throw new Error("Destination names array cannot be empty");
    }

    if (!dates.length) {
        throw new Error("Dates array cannot be empty");
    }

    // 1. Получаем arrivalLocations
    const arrivalLocations = await fetchPackageArrivalLocations(destinationNames);

    // 2. Получаем доступные даты для этих локаций
    const availableDates = await fetchPackageAvailableDates(arrivalLocations);
    // 3. Получаем доступные ночи
    const availableNights = await fetchPackageAvailableNights(arrivalLocations, availableDates);

    // 4. Получаем зашифрованный URL для редиректа
    const searchResponse = await fetchPackagePriceSearchEncrypt(
        arrivalLocations,
        availableDates,
        availableNights,
        dates,
        nights,
        filters
    );

    console.log(searchResponse);
    const {redirectionUrl, queryParam} = searchResponse.result;

    if (!redirectionUrl || !queryParam) {
        throw new Error("Invalid response: missing redirection URL or query parameter");
    }

    return `${redirectionUrl}?qp=${queryParam}${RESERVATION_TYPE_PARAMS.package}`;
}
