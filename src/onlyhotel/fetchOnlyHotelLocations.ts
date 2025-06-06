import {HotelLocation, HotelLocationResponse} from "../types";
import {doRequestToServer} from "../api";

export async function fetchOnlyHotelLocations(names: string | string[]): Promise<HotelLocation[]> {
    const searchList = Array.isArray(names) ? names : [names];

    const allResults = await Promise.all(
        searchList.map(name =>
            doRequestToServer<HotelLocationResponse>(
                '/OnlyHotelProduct/ListArrivalLocations',
                {text: name},
                'POST'
            )
        )
    );

    const allLocations = allResults.flatMap(res => res.result.locations);

    const filtered: HotelLocation[] = [];

    for (const loc of allLocations) {
        if (searchList.includes(loc.name) && !filtered.some(h => h.name === loc.name)) {
            filtered.push(loc);
        }
    }

    return filtered;
}
