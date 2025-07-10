import {ArrivalLocation} from "../types";
import {doRequestToServer, PACKAGE_ENDPOINTS} from "../api";
import {DEFAULT_DEPARTURE, DEFAULT_DEPARTURE_FRIENDLY, DEFAULT_DEPARTURE_ID, LOCATION_TYPES} from "../constants";

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
 * Получает arrival локации для PackageTour на основе названий стран
 *
 * @param countryNames - массив названий стран
 * @returns Promise<ArrivalLocation[]>
 */
export async function fetchPackageArrivalLocations(countryNames: string[]): Promise<ArrivalLocation[]> {
    if (!countryNames.length) {
        throw new Error("Country names array cannot be empty");
    }

    const processedLocations: ArrivalLocation[] = [];

    for (const name of countryNames) {
        const response = await doRequestToServer<any, { departureLocations: any[], text: string }>(
            PACKAGE_ENDPOINTS.LIST_ARRIVAL_LOCATIONS,
            {
                departureLocations: [{
                    id: DEFAULT_DEPARTURE_ID,
                    name: DEFAULT_DEPARTURE,
                    type: 5,
                    friendlyUrl: DEFAULT_DEPARTURE_FRIENDLY
                }],
                text: name.trim()
            },
            "POST",
        );

        const countryLocation = response.result?.locations.find(
            (loc: ArrivalLocation) =>
                loc.type === LOCATION_TYPES.COUNTRY && loc.name.trim().toUpperCase() === name.trim().toUpperCase()
        );

        if (countryLocation) {
            processedLocations.push(mapCountryLocation(countryLocation));
        }
    }

    return processedLocations;
}
