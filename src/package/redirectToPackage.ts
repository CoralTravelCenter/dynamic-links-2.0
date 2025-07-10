import {requestPackageRedirect} from "./requestPackageRedirect";
import {Filter} from "../types";

/**
 * Выполняет редирект на URL бронирования PackageTour на основе параметров поиска
 *
 * @param destinationNames - Массив названий стран или регионов для поиска
 * @param dates - Кортеж содержащий [startDate, endDate] в формате YYYY-MM-DD
 * @param nights - Количество ночей для тура
 * @param filters - Опциональная строка фильтров через запятую
 * @throws Error если параметры невалидные или URL редиректа не может быть сгенерирован
 */
export async function redirectToPackage(
    destinationNames: string[],
    dates: [string, string],
    nights: number,
    filters: Filter[],
): Promise<void> {
    if (!destinationNames.length) {
        throw new Error("Destination names array cannot be empty");
    }

    if (!dates.length || dates.length !== 2) {
        throw new Error("Dates must be a tuple with exactly 2 elements");
    }

    if (nights <= 0) {
        throw new Error("Nights must be a positive number");
    }

    const redirectUrl = await requestPackageRedirect(destinationNames, dates, nights, filters);

    if (!redirectUrl) {
        throw new Error("Failed to generate redirect URL");
    }

    // Открываем URL в новой вкладке с атрибутами безопасности
    window.open(redirectUrl, "_blank", "noopener,noreferrer");
}
