import { requestOnlyHotelRedirect } from "./requestOnlyHotelRedirect";

/**
 * Выполняет редирект на URL бронирования OnlyHotel на основе параметров поиска
 *
 * @param hotelNames - Массив названий отелей для поиска
 * @param dates - Кортеж содержащий [startDate, endDate] в формате YYYY-MM-DD
 * @param nights - Количество ночей для проживания
 * @param filters - Опциональная строка фильтров через запятую
 * @throws Error если параметры невалидные или URL редиректа не может быть сгенерирован
 */
export async function redirectToOnlyHotel(
	hotelNames: string[],
	dates: [string, string],
	nights: number,
	filters: string | null,
): Promise<void> {
	if (!hotelNames.length) {
		throw new Error("Hotel names array cannot be empty");
	}

	if (!dates.length || dates.length !== 2) {
		throw new Error("Dates must be a tuple with exactly 2 elements");
	}

	if (nights <= 0) {
		throw new Error("Nights must be a positive number");
	}

	const redirectUrl = await requestOnlyHotelRedirect(hotelNames, dates, nights, filters);

	if (!redirectUrl) {
		throw new Error("Failed to generate redirect URL");
	}

	// Открываем URL в новой вкладке с атрибутами безопасности
	window.open(redirectUrl, "_blank", "noopener,noreferrer");
}
