import {LocationItem, OnlyHotelArrivalLocationResponse} from "../types";
import {doRequestToServer} from "../api";

export async function fetchOnlyHotelLocations(names: string | string[]): Promise<LocationItem[]> {
    const searchList = Array.isArray(names) ? names : [names];

    const allResults = await Promise.all(
        searchList.map(name =>
            doRequestToServer<OnlyHotelArrivalLocationResponse>(
                '/OnlyHotelProduct/PriceSearchEncrypt',
                {text: name},
                'POST'
            )
        )
    );

    const allLocations = allResults.flatMap(res => res.result.locations);

    const filtered: LocationItem[] = [];

    // Более гибкое сопоставление с помощью нормализации названий
    const normalizedSearchNames = searchList.map(name => name.toLowerCase().trim());

    for (const loc of allLocations) {
        const locNameNormalized = loc.name.toLowerCase().trim();

        // Проверяем либо точное совпадение, либо вхождение названия отеля в одно из искомых
        const matchesSearch = normalizedSearchNames.some(searchName =>
            locNameNormalized === searchName ||
            locNameNormalized.includes(searchName) ||
            searchName.includes(locNameNormalized)
        );

        if (matchesSearch && !filtered.some(h => h.id === loc.id)) {
            filtered.push(loc);
        }
    }

    console.log(filtered);
    return filtered;
}
