import {ArrivalLocation, OnlyHotelArrivalLocationResponse} from "../types";
import {doRequestToServer, onlyHotelEndPoints} from "../api";
import {filterUniqueMatchingHotels} from "./filterUniqueMatchingHotels";

function mapCountry(item: any) {
    return {
        id: item.id,
        name: item.name,
        friendlyUrl: item.friendlyUrl,
        type: item.type,
    };
}

function mapHotel(item: any) {
    return {
        id: item.id.split("-")[0],
        type: item.type,
        name: item.name,
        friendlyUrl: item.friendlyUrl,
        tourId: 0,
        transportPointId: 0,
        parent: {
            id: item.parent.id,
            type: item.type,
            name: item.parent.name,
            countryId: item.parent.countryId,
        },
        children: [],
    };
}

export async function fetchOnlyHotelLocations(hotelNames: string[]): Promise<ArrivalLocation[]> {
    // Выполняем параллельные запросы к API, для каждого названия отеля
    const responses = await Promise.all(
        hotelNames.map((name) =>
            doRequestToServer(
                onlyHotelEndPoints.listArrivalLocations,
                {text: name},
                "POST",
            ),
        ),
    ) as OnlyHotelArrivalLocationResponse[];

    const uniqueLocations = filterUniqueMatchingHotels(responses, hotelNames);
    console.log(uniqueLocations);

    // Преобразуем данные в нужный формат ArrivalLocation
    return uniqueLocations.map((item) => {
        let result;

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

        return result;
    }).filter(Boolean);
}
