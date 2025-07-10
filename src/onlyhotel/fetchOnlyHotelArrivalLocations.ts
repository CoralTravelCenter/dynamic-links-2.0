import {ArrivalLocation, LocationType, OnlyHotelArrivalLocationResponse} from "../types";
import {doRequestToServer, ONLY_HOTEL_ENDPOINTS} from "../api";

import {LOCATION_TYPES} from "../constants";
import {filterUniqueMatchingHotels} from "../utils";

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
 * Преобразует данные локации отеля в стандартизированный формат
 */
function mapHotelLocation(item: ArrivalLocation): ArrivalLocation {
    return {
        id: item.id.split("-")[0], // Remove additional ID parts
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

/**
 * Получает локации прибытия для OnlyHotel на основе названий отелей
 *
 * @param hotelNames - Массив названий отелей для поиска
 * @returns Promise, разрешающийся в массив обработанных локаций прибытия
 * @throws Error если API запрос не удался или не найдены валидные локации
 */
export async function fetchOnlyHotelLocations(hotelNames: string[]): Promise<ArrivalLocation[]> {
    if (!hotelNames.length) {
        throw new Error("Hotel names array cannot be empty");
    }

    // Выполняем параллельные API запросы для каждого названия отеля
    const responses = await Promise.all(
        hotelNames.map((name) =>
            doRequestToServer<OnlyHotelArrivalLocationResponse, { text: string }>(
                ONLY_HOTEL_ENDPOINTS.LIST_ARRIVAL_LOCATIONS,
                {text: name.trim()},
                "POST",
            ),
        ),
    );

    const uniqueLocations: ArrivalLocation[] = filterUniqueMatchingHotels(responses, hotelNames);

    // Обрабатываем локации на основе их типа
    const processedLocations: ArrivalLocation[] = [];

    for (const location of uniqueLocations) {
        let processedLocation: ArrivalLocation | null = null;

        switch (location.type as LocationType) {
            case LOCATION_TYPES.COUNTRY:
                processedLocation = mapCountryLocation(location);
                break;
            case LOCATION_TYPES.HOTEL:
                processedLocation = mapHotelLocation(location);
                break;
            default:
                continue;
        }

        if (processedLocation) {
            processedLocations.push(processedLocation);
        }
    }

    return processedLocations;
}
