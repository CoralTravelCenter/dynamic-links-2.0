import { prepareMultipleHotelsArrivalLocations } from "./prepareMultipleHotelsArrivalLocations";
import { HotelLocation } from "../types";

/**
 * Строит payload для запроса множественного поиска отелей
 * @param hotelLocations - массив локаций отелей для поиска
 * @param nights - количество ночей
 * @param beginDates - даты начала и конца
 * @param filter - строка фильтров, разделенных запятой (например, "5stars,4stars,ai")
 */
export function buildMultipleHotelsPayload(
	hotelLocations: HotelLocation[],
	nights: number,
	beginDates: string[],
	filter: string | null,
) {
	// Проверка на наличие локаций
	if (!hotelLocations.length) {
		console.warn("No hotel locations provided for multiple hotels payload");
	}

	return {
		searchCriterias: {
			reservationType: 2,
			beginDates,
			nights: [{ value: nights }],
			roomCriterias: [
				{
					passengers: [
						{
							passengerType: 0,
							age: 20,
						},
						{
							passengerType: 0,
							age: 20,
						},
					],
				},
			],
			arrivalLocations: prepareMultipleHotelsArrivalLocations(hotelLocations),
			paging: {
				hasPreviousPage: false,
				hasNextPage: false,
				pageNumber: 1,
				pageSize: 20,
				sortType: 0,
			},
			imageSizes: [4],
		},
		notIncludeFilters: true,
		searchSource: 0,
	};
}
