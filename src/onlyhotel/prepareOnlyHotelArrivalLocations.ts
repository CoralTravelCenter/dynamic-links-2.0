import {ArrivalLocation, LocationItem} from "../types";

export function prepareOnlyHotelArrivalLocations(hotels: LocationItem[]): ArrivalLocation[] {
    return hotels.map(hotel => {
        return {
            id: hotel.id,
            name: hotel.name,
            friendlyUrl: hotel.friendlyUrl,
            type: hotel.type,
            parent: {
                id: hotel.parent?.id,
                name: hotel.parent?.name,
                type: hotel.parent?.type,
                countryId: hotel.parent?.countryId,
            },
        }
    });
}
