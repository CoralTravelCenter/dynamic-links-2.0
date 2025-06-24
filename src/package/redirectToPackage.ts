import { requestPackageRedirect } from "./requestPackageRedirect";

/**
 * Выполняет редирект на URL бронирования пакетных туров на основе параметров поиска
 *
 * @param destination - Название страны или региона для поиска
 * @param dates - Кортеж содержащий [startDate, endDate] в формате YYYY-MM-DD
 * @param nights - Количество ночей для проживания
 * @param filters - Опциональная строка фильтров через запятую
 * @throws Error если параметры невалидные или URL редиректа не может быть сгенерирован
 */
export async function redirectToPackage(
	destination: string,
	dates: [string, string],
	nights: number,
	filters: string | null,
): Promise<void> {
	if (!destination || !destination.trim()) {
		throw new Error("Destination cannot be empty");
	}

	if (!dates.length || dates.length !== 2) {
		throw new Error("Dates must be a tuple with exactly 2 elements");
	}

	if (nights <= 0) {
		throw new Error("Nights must be a positive number");
	}

	const redirectUrl = await requestPackageRedirect(
		destination,
		dates,
		nights,
		filters,
	);

	// Открываем URL в новой вкладке с атрибутами безопасности
	window.open(redirectUrl, "_blank", "noopener,noreferrer");
}
