import {doRequestToServer, PACKAGE_ENDPOINTS} from "../api";
import {ArrivalLocation, PackageAvailableNightsResponse} from "../types";

/**
 * Выполняет запрос к API PackageTour для получения доступных ночей
 *
 * @param arrivalLocations - Локации прибытия
 * @param availableDates - Ответ от ListAvailableDates, содержащий даты
 * @returns Promise с ответом от API (список доступных ночей)
 * @throws Error если API вернул ошибку
 */
export async function fetchPackageAvailableNights(
    arrivalLocations: ArrivalLocation[],
    availableDatesResponse: any
): Promise<PackageAvailableNightsResponse> {
    if (!arrivalLocations.length) {
        throw new Error("Arrival locations array cannot be empty");
    }

    const beginDates = availableDatesResponse?.result?.dates?.map((d: any) => new Date(d.date));
    if (!beginDates?.length) {
        throw new Error("No available begin dates found");
    }

    const body = {
        flightType: 2,
        beginDates,
        calculateAvailableNightRanges: true,
        departureLocations: [{
            id: "2671-5",
            name: "Москва",
            type: 5,
            friendlyUrl: "moskva"
        }],
        arrivalLocations
    };

    return await doRequestToServer<PackageAvailableNightsResponse>(
        PACKAGE_ENDPOINTS.LIST_AVAILABLE_NIGHTS,
        body,
        "POST"
    );
}
