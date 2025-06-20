import {ArrivalLocation} from "../types";
import {doRequestToServer, onlyHotelEndPoints} from "../api";

export async function fetchOnlyHotelLocations(names: string[]): Promise<ArrivalLocation[]> {
    // Выполняем параллельные запросы к API, для каждого названия отеля
    const responses = await Promise.all(
        names.map((name) =>
            doRequestToServer(
                onlyHotelEndPoints.listArrivalLocations,
                {text: name},
                "POST",
            ),
        ),
    );

    // Объединяем все результаты запросов и фильтруем только те отели,
    // названия которых точно соответствуют искомым (без учета регистра и пробелов)
    const filteredLocations = responses.flatMap((response) => {
        const locations = response.result.locations;
        return locations.filter((hotel) =>
            names.some((name) => hotel.name.trim().toUpperCase() === name.trim().toUpperCase()),
        );
    });

    // Убираем дубликаты по ID
    const uniqueLocationsMap = new Map();
    filteredLocations.forEach((hotel) => {
        if (!uniqueLocationsMap.has(hotel.id)) {
            uniqueLocationsMap.set(hotel.id, hotel);
        }
    });

    // Преобразуем данные в нужный формат ArrivalLocation
    // Извлекаем первую часть ID до дефиса (если дефис присутствует)
    return Array.from(uniqueLocationsMap.values()).map(
        (hotel) => ({
            id: hotel.id.split("-")[0],
            type: hotel.type,
            name: hotel.name,
            friendlyUrl: hotel.friendlyUrl,
            tourId: 0,
            transportPointId: 0,
            parent: {
                id: hotel.parent.id,
                type: hotel.type,
                name: hotel.parent.name,
                countryId: hotel.parent.countryId,
            },
            children: [],
        }),
    );
}
