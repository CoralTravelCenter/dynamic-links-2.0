import { OnlyHotelArrivalLocationResponse, ArrivalLocation } from "../types";

/**
 * Фильтрует массив ответов с локациями, оставляя только отели,
 * названия которых точно соответствуют переданным (без учета регистра и пробелов).
 * Также удаляет дубликаты по ID отеля.
 */
export function filterUniqueMatchingHotels(
	responses: OnlyHotelArrivalLocationResponse[],
	names: string[],
): OnlyHotelArrivalLocationResponse[] {
	const normalizedNames = names.map((name) => name.trim().toUpperCase());

	// Фильтрация по точному совпадению имени
	const filteredLocations = responses.flatMap((response) => {
		return response.result.locations.filter((hotel) =>
			normalizedNames.includes(hotel.name.trim().toUpperCase()),
		);
	});

	// Удаление дубликатов по ID
	const uniqueLocationsMap = new Map<string, ArrivalLocation>();
	filteredLocations.forEach((hotel) => {
		if (!uniqueLocationsMap.has(hotel.id)) {
			uniqueLocationsMap.set(hotel.id, hotel);
		}
	});

	return Array.from(uniqueLocationsMap.values());
}
