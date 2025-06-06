import {prepareOnlyHotelArrivalLocations} from './prepareOnlyHotelArrivalLocations';
import {HotelLocation} from "../types";
import {addFilters} from "../addFilters";
import {filters} from "../filters";


export function buildOnlyHotelPayload(
    hotelLocations: HotelLocation[],
    nights: number,
    beginDates: string[],
    filter: string | null
) {
    return {
        reservationType: 2,
        beginDates,
        arrivalLocations: prepareOnlyHotelArrivalLocations(hotelLocations),
        nights: [{value: nights}],
        roomCriterias: [
            {
                passengers: [
                    {age: 20, passengerType: 0},
                    {age: 20, passengerType: 0},
                ],
            },
        ],
        paging: {
            pageNumber: 1,
            pageSize: 20,
            sortType: 0,
        },
        additionalFilters: addFilters(filter ?? '', filters),
    };
}
