import {doRequestToServer, PACKAGE_ENDPOINTS} from "../api";
import {ArrivalLocation, Filter, PackagePriceSearchEncryptResponse} from "../types";

export async function fetchPackagePriceSearchEncrypt(
    arrivalLocations: ArrivalLocation[],
    availableDatesResponse: any,
    availableNightsResponse: any,
    dates: string[],
    nights: number,
    filters: Filter[]
): Promise<PackagePriceSearchEncryptResponse> {
    if (!arrivalLocations.length) {
        throw new Error("Arrival locations array cannot be empty");
    }

    let beginDates: Date[] = [];

    if (dates?.length === 2) {
        beginDates = [new Date(dates[0]), new Date(dates[1])];
    } else {
        // Пробуем из API ListAvailableDates
        const availableDates = availableDatesResponse?.result?.dates?.map((d: any) => new Date(d.date));
        if (availableDates?.length) {
            beginDates = [availableDates[0], new Date(availableDates[0].getTime() + nights * 24 * 60 * 60 * 1000)];
        } else {
            // Fallback: depth 14
            const today = new Date();
            const start = new Date(today.setDate(today.getDate() + 14));
            const end = new Date(start.getTime() + nights * 24 * 60 * 60 * 1000);
            beginDates = [start, end];
        }
    }

    const availableNightsList = availableNightsResponse?.result?.nights || [];
    let selectedNightValue = nights;

    if (!nights || nights <= 0) {
        if (availableNightsList.some((n: any) => n.value === 7)) {
            selectedNightValue = 7;
        } else if (availableNightsList.length) {
            selectedNightValue = availableNightsList[0].value;
        } else {
            throw new Error("No valid nights found in API response");
        }
    }

    const finalNights = [{value: selectedNightValue}];

    const body = {
        beginDates,
        arrivalLocations,
        departureLocations: [{
            id: "2671-5",
            name: "Москва",
            type: 5,
            friendlyUrl: "moskva"
        }],
        nights: finalNights,
        datePickerMode: 0,
        roomCriterias: [
            {
                passengers: [
                    {age: 20, passengerType: 0},
                    {age: 20, passengerType: 0}
                ]
            }
        ],
        reservationType: 1,
        paging: {pageNumber: 1, pageSize: 20, sortType: 0},
        additionalFilters: filters ?? [],
        imageSizes: [0]
    };

    return await doRequestToServer<PackagePriceSearchEncryptResponse>(
        PACKAGE_ENDPOINTS.PRICE_SEARCH_ENCRYPT,
        body,
        "POST"
    );
}
