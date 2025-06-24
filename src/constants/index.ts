// Экспорт общих констант
export * from "./common";

// Экспорт констант для OnlyHotel
export * from "./onlyhotel";

// Экспорт констант для пакетных туров
export * from "./package";

// Совместимость с старыми импортами
export { onlyHotelFiltersMap as filtersMap } from "./onlyhotel";

// Объединенный объект параметров бронирования для обратной совместимости
import { onlyHotelReservationParam } from "./onlyhotel";
import { packageReservationParam } from "./package";
import { ReservationTypeParam } from "../types";

export const reservationTypeParam: ReservationTypeParam = {
	onlyHotel: onlyHotelReservationParam,
	package: packageReservationParam,
};

// Обновленные HTML атрибуты - используем общие для обеих функциональностей
export { HTML_ATTRIBUTES } from "./common";
