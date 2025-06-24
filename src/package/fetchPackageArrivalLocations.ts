import {
	ArrivalLocation,
	OnlyHotelArrivalLocationResponse,
	LocationType,
} from "../types";
import { doRequestToServer, PACKAGE_ENDPOINTS } from "../api";
import { LOCATION_TYPES, arrivalRegionsObject } from "../constants";

/**
 * Преобразует данные локации страны в стандартизированный формат
 */
function mapCountryLocation(item: ArrivalLocation): ArrivalLocation {
	return {
		id: item.id,
		name: item.name,
		friendlyUrl: item.friendlyUrl,
		type: item.type,
		parent: item.parent,
		children: item.children || [],
	};
}

/**
 * Создает локацию на основе предопределенных данных из arrivalRegionsObject
 */
function createLocationFromRegionData(
	destination: string,
	regionData: readonly [string, string],
): ArrivalLocation {
	const [id, friendlyUrl] = regionData;

	return {
		id,
		name: destination,
		friendlyUrl,
		type: LOCATION_TYPES.COUNTRY,
		parent: {
			id: "0",
			type: 0,
			name: "Мир",
			countryId: "0",
		},
		children: [],
	};
}

/**
 * Получает локации прибытия для пакетных туров на основе названия направления
 *
 * @param destination - Название страны или региона для поиска
 * @returns Promise, разрешающийся в массив обработанных локаций прибытия
 * @throws Error если направление не найдено в предопределенном списке
 */
export async function fetchPackageLocations(
	destination: string,
): Promise<ArrivalLocation[]> {
	if (!destination || !destination.trim()) {
		throw new Error("Destination cannot be empty");
	}

	const trimmedDestination = destination.trim();

	// Сначала проверяем, есть ли направление в предопределенном объекте
	if (arrivalRegionsObject[trimmedDestination]) {
		const regionData = arrivalRegionsObject[trimmedDestination];
		const location = createLocationFromRegionData(
			trimmedDestination,
			regionData,
		);
		return [location];
	}

	// Если нет в предопределенном списке, делаем API запрос
	try {
		const response = await doRequestToServer<
			OnlyHotelArrivalLocationResponse,
			{ text: string; locationTypes?: number[] }
		>(
			PACKAGE_ENDPOINTS.LIST_ARRIVAL_LOCATIONS,
			{
				text: trimmedDestination,
				locationTypes: [LOCATION_TYPES.COUNTRY], // Для пакетных туров ищем преимущественно страны
			},
			"POST",
		);

		if (!response.result?.locations?.length) {
			throw new Error(
				`No locations found for destination: ${destination}`,
			);
		}

		// Обрабатываем локации на основе их типа
		const processedLocations: ArrivalLocation[] = [];

		for (const location of response.result.locations) {
			let processedLocation: ArrivalLocation | null = null;

			switch (location.type as LocationType) {
				case LOCATION_TYPES.COUNTRY:
					processedLocation = mapCountryLocation(location);
					break;
				default:
					// Для пакетных туров принимаем только страны
					continue;
			}

			if (processedLocation) {
				processedLocations.push(processedLocation);
			}
		}

		if (!processedLocations.length) {
			throw new Error(
				`No valid country locations found for destination: ${destination}`,
			);
		}

		return processedLocations;
	} catch (error) {
		console.error(
			`Error fetching package locations for destination ${destination}:`,
			error,
		);
		throw error;
	}
}
