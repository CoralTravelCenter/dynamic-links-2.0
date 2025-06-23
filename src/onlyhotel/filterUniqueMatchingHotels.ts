import { OnlyHotelArrivalLocationResponse, ArrivalLocation } from "../types";

/**
 * Фильтрует массив ответов с локациями, возвращая только отели с именами, которые точно соответствуют
 * запрошенным именам (сравнение без учета регистра). Также удаляет дубликаты по ID отеля.
 *
 * @param responses - Массив API ответов содержащих данные локаций
 * @param requestedNames - Массив названий отелей для сопоставления
 * @returns Массив уникальных локаций, соответствующих запрошенным именам
 */
export function filterUniqueMatchingHotels(
	responses: OnlyHotelArrivalLocationResponse[],
	requestedNames: string[],
): ArrivalLocation[] {
	if (!responses.length || !requestedNames.length) {
		return [];
	}

	// Нормализуем запрошенные имена для сравнения без учета регистра
	const normalizedRequestedNames = requestedNames
		.map((name) => name.trim().toUpperCase())
		.filter(Boolean);

	if (!normalizedRequestedNames.length) {
		return [];
	}

	// Извлекаем все локации из ответов и фильтруем по точному совпадению имени
	const matchingLocations = responses.flatMap((response) => {
		if (!response.result?.locations) {
			return [];
		}

		return response.result.locations.filter((location) => {
			const normalizedLocationName = location.name.trim().toUpperCase();
			return normalizedRequestedNames.includes(normalizedLocationName);
		});
	});

	// Удаляем дубликаты по ID используя Map
	const uniqueLocationsMap = new Map<string, ArrivalLocation>();
	matchingLocations.forEach((location) => {
		if (!uniqueLocationsMap.has(location.id)) {
			uniqueLocationsMap.set(location.id, location);
		}
	});

	return Array.from(uniqueLocationsMap.values());
}
