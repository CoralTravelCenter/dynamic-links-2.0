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
    };
}

/**
 * Преобразует данные локации отеля в стандартизированный формат
 */
function mapHotelLocation(item: ArrivalLocation): ArrivalLocation {
    return {
        id: item.id,
        name: item.name,
        friendlyUrl: item.friendlyUrl,
        type: item.type,
        parent: item.parent,
    };
}

/**
 * Получает локации для списка названий отелей/направлений.
 * Возвращает уникальные и корректно типизированные локации (страна/отель).
 */
export async function fetchOnlyHotelLocations(hotelNames: string[]): Promise<ArrivalLocation[]> {
    if (!Array.isArray(hotelNames) || hotelNames.length === 0) {
        throw new Error("hotelNames must be a non-empty array");
    }

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
