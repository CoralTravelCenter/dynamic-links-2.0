import {requestOnlyHotelRedirect} from "./requestOnlyHotelRedirect";

/**
 * Выполняет редирект на URL, полученный с сервера,
 * на основе указанных отелей, дат, количества ночей и фильтров.
 */
export async function redirectToOnlyHotel(
	hotelNames: string[],
	dates: [string, string],
	nights: number,
	filters: string | null
) {
	const url = await requestOnlyHotelRedirect(hotelNames, dates, nights, filters);
	window.open(url, "_blank");
}