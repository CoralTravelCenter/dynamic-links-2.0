import {ArrivalLocation, LocationItem} from "../types";

// Улучшенная версия извлечения страны
function extractCountryFromParent(parent: any): string {
    if (!parent || !parent.name) return '';

    // Извлечение страны из строки формата "Регион, Страна"
    const name = parent.name;
    const parts = name.split(',').map((s: string) => s.trim());

    // Возвращаем последнюю часть как страну, или предпоследнюю если есть больше 2 частей
    if (parts.length > 2) {
        // В сложных адресах часто страна - предпоследний элемент
        return parts[parts.length - 2] || parts[parts.length - 1] || '';
    }

    return parts[parts.length - 1] || '';
}

export function prepareOnlyHotelArrivalLocations(hotels: LocationItem[]): ArrivalLocation[] {
    return hotels.map(hotel => {
        return {
            id: hotel.id,
            value: hotel.id,
            name: hotel.name,
            label: hotel.name,
            title: hotel.name,
            friendlyUrl: hotel.friendlyUrl,
            type: hotel.type,
            countryName: extractCountryFromParent(hotel?.parent),
            parent: {
                id: hotel.parent?.id,
                name: hotel.parent?.name,
                type: hotel.parent?.type,
                countryId: hotel.parent?.countryId,
            },
            children: null
        }
    });
}
