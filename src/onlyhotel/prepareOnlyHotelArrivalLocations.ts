import {HotelLocation} from "../types";

// Упрощённая версия извлечения страны
function extractCountryFromParent(name: string): string {
    const parts = name.split(',').map(s => s.trim());
    return parts[parts.length - 1] || '';
}

export function prepareOnlyHotelArrivalLocations(hotels: HotelLocation[]) {
    return hotels.map(hotel => ({
        id: hotel.id,
        value: hotel.id,
        name: hotel.name,
        label: hotel.name,
        title: hotel.name,
        friendlyUrl: hotel.friendlyUrl,
        type: hotel.type,
        countryName: extractCountryFromParent(hotel?.parent.name),
        parent: {
            id: hotel.parent.id,
            name: hotel.parent.name,
            type: hotel.parent.type,
            countryId: hotel.parent.countryId,
        },
        children: null
    }));
}
