import { ArrivalLocation, OnlyHotelArrivalLocationResponse } from "../types";
import { doRequestToServer, onlyHotelEndPoints } from "../api";
import { filterUniqueMatchingHotels } from "./filterUniqueMatchingHotels";

function mapCountry(item: ArrivalLocation): ArrivalLocation {
	return {
		id: item.id,
		name: item.name,
		friendlyUrl: item.friendlyUrl,
		type: item.type,
		parent: item.parent,
		children: item.children,
	};
}

function mapHotel(item: ArrivalLocation): ArrivalLocation {
	return {
		id: item.id.split("-")[0],
		type: item.type,
		name: item.name,
		friendlyUrl: item.friendlyUrl,
		parent: {
			id: item.parent.id,
			type: item.parent.type,
			name: item.parent.name,
			countryId: item.parent.countryId,
		},
		children: [],
	};
}

export async function fetchOnlyHotelLocations(
	hotelNames: string[],
): Promise<ArrivalLocation[]> {
	// Выполняем параллельные запросы к API, для каждого названия отеля
	const responses = (await Promise.all(
		hotelNames.map((name) =>
			doRequestToServer(
				onlyHotelEndPoints.listArrivalLocations,
				{ text: name },
				"POST",
			),
		),
	)) as OnlyHotelArrivalLocationResponse[];

	const uniqueLocations: OnlyHotelArrivalLocationResponse[] =
		filterUniqueMatchingHotels(responses, hotelNames);

	// Преобразуем данные в нужный формат ArrivalLocation
	const processedLocations: ArrivalLocation[] = [];

	for (const item of uniqueLocations) {
		let result: ArrivalLocation | null = null;
		console.log(item);

		switch (item.type) {
			case 0:
				result = mapCountry(item);
				break;
			case 7:
				result = mapHotel(item);
				break;
			default:
				console.warn(`Необработанный тип: ${item.type}`, item);
				result = null;
		}

		if (result !== null) {
			processedLocations.push(result);
		}
	}

	return processedLocations;
}
