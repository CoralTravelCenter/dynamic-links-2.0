import {HotelLocation} from "../types";

export function prepareMultipleHotelsArrivalLocations(hotels: HotelLocation[]) {
    return hotels.map(hotel => ({
        id: hotel.id,
        type: hotel.type,
        name: hotel.name,
        friendlyUrl: hotel.friendlyUrl,
        parent: hotel.parent ? {
            id: hotel.parent.id,
            type: hotel.parent.type,
            name: hotel.parent.name
        } : undefined
    }));
}