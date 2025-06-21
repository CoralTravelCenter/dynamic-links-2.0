import {doRequestToServer, onlyHotelEndPoints} from "../api";
import {ArrivalLocation, OnlyHotelPriceSearchEncryptResponse} from "../types";
import {addFilters} from "../utils";

function buildPayloadForHotel(locations: ArrivalLocation[], dates: string[], nights: string, filters: string | null) {
    return {
        beginDates: dates,
        arrivalLocations: locations,
        nights: [{value: parseInt(nights)}],
        roomCriterias: [
            {
                passengers: [
                    {age: 20, passengerType: 0},
                    {age: 20, passengerType: 0},
                ],
            },
        ],
        reservationType: 2,
        paging: {pageNumber: 1, pageSize: 20, sortType: 0},
        additionalFilters: addFilters(filters),
        imageSizes: [0],
        categories: [],
    };
}

function buildPayloadForCountry(locations: ArrivalLocation[], dates: string[], nights: number, filters: string | null) {
    return {
        beginDates: dates,
        arrivalLocations: locations,
        nights: [{value: parseInt(nights)}],
        roomCriterias: [
            {
                passengers: [
                    {age: 20, passengerType: 0},
                    {age: 20, passengerType: 0},
                ],
            },
        ],
        reservationType: 2,
        paging: {pageNumber: 1, pageSize: 20, sortType: 0},
        additionalFilters: addFilters(filters),
        imageSizes: [0],
        categories: [],
    };
}

export async function fetchPriceSearchEncrypt(
    locations: ArrivalLocation[] | any,
    dates: string[],
    nights: number,
    filters: string | null,
): Promise<OnlyHotelPriceSearchEncryptResponse> {
    const payload = locations.type === 7
        ? buildPayloadForHotel(locations, dates, nights, filters)
        : buildPayloadForCountry(locations, dates, nights, filters);
    return await doRequestToServer(onlyHotelEndPoints.priceSearchEncrypt, payload, "POST");
}
