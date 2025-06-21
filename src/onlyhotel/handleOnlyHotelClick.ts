import {extractOnlyHotelParams} from "./extractOnlyHotelParams";
import {calculateDates} from "./calculateDates";
import {redirectToOnlyHotel} from "./redirectToOnlyHotel";

/**
 * Обработчик клика по элементу "только отели".
 * Извлекает параметры, рассчитывает даты и вызывает редирект.
 */
export async function handleOnlyHotelClick(target: HTMLElement) {
	try {
		const {hotelNames, depth, nights, filters} = extractOnlyHotelParams(target);
		const dates = calculateDates(depth, nights);
		await redirectToOnlyHotel(hotelNames, dates, nights, filters);
	} catch (error) {
		console.error("Failed to handle OnlyHotel click:", error);
	}
}