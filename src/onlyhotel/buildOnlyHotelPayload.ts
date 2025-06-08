import {prepareOnlyHotelArrivalLocations} from './prepareOnlyHotelArrivalLocations';
import {HotelLocation} from "../types";
import {addFilters} from "../addFilters";
import {filters} from "../filters";

/**
 * Строит payload для запроса "только отель"
 * @param hotelLocations - массив локаций отелей для поиска
 * @param nights - количество ночей
 * @param beginDates - даты начала и конца
 * @param filter - строка фильтров, разделенных запятой (например, "5stars,4stars,ai")
 */
export function buildOnlyHotelPayload(
    hotelLocations: HotelLocation[],
    nights: number,
    beginDates: string[],
    filter: string | null
) {
    // Проверка на наличие локаций
    if (!hotelLocations.length) {
        console.warn('No hotel locations provided for payload');
    }
    
    // Добавляем фильтры из строки фильтров
    const additionalFilters = addFilters(filter ?? '', filters);
    
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
        additionalFilters,
    };
}
