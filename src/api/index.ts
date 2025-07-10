// Константы с конечными точками API для работы с отелями
export const ONLY_HOTEL_ENDPOINTS = {
	LIST_ARRIVAL_LOCATIONS: "/OnlyHotelProduct/ListArrivalLocations",
	PRICE_SEARCH_ENCRYPT: "/OnlyHotelProduct/PriceSearchEncrypt",
};

// Константы с конечными точками API для работы с пакетными турами
export const PACKAGE_ENDPOINTS = {
	LIST_ARRIVAL_LOCATIONS: "/PackageTourHotelProduct/ListArrivalLocations",
	LIST_AVAILABLE_DATES: "/PackageTourHotelProduct/ListAvailableDates",
	LIST_AVAILABLE_NIGHTS: "/PackageTourHotelProduct/ListAvailableNights",
	PRICE_SEARCH_ENCRYPT: "/PackageTourHotelProduct/PriceSearchEncrypt",
};

/**
 * Формирует полный URL для API эндпоинта
 * @param endpoint - путь к эндпоинту API
 * @returns полный URL для запроса
 */
function endpointUrl(endpoint: string): string {
	// Проверяем, запущено ли приложение на localhost
	const isLocalhost = location.hostname === "localhost";

	// Определяем хост в зависимости от окружения
	const host = isLocalhost
		? "http://localhost:8010/proxy" // Для разработки используем прокси
		: "//" + location.hostname.replace(/^(www|new)/, "b2capi"); // Для продакшена заменяем префикс на b2capi

	return `${host}${endpoint}`;
}

/**
 * Выполняет HTTP запрос к серверу
 * @param endpoint - путь к API эндпоинту
 * @param data - данные для отправки в теле запроса
 * @param method - HTTP метод (POST или GET), по умолчанию POST
 * @returns Promise с типизированным ответом от сервера
 */
export async function doRequestToServer<T, U>(
	endpoint: string,
	data: U,
	method: "POST" | "GET" = "POST",
): Promise<T> {
	try {
		// Формируем полный URL для запроса
		const url = endpointUrl(endpoint);

		// Выполняем HTTP запрос с необходимыми заголовками
		const response = await fetch(url, {
			method,
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			// Преобразуем данные в JSON строку для отправки
			body: JSON.stringify(data),
		});

		// Проверяем успешность ответа
		if (!response.ok) {
			console.error(
				`API Error: ${response.status} ${response.statusText} for ${endpoint}`,
			);
			throw new Error(
				`API Error: ${response.status} ${response.statusText}`,
			);
		}

		// Парсим JSON ответ и возвращаем с типизацией
		return (await response.json()) as T;
	} catch (error) {
		// Логируем ошибку и пробрасываем её дальше
		console.error(
			`Error in doRequestToServer for endpoint ${endpoint}:`,
			error,
		);
		throw error;
	}
}
