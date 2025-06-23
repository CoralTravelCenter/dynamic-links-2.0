import { defaultDepthDays, defaultNights } from "../constants";

/**
 * Извлекает параметры запроса к OnlyHotel из атрибутов HTML-элемента.
 * Проверяет наличие и валидность названий отелей, глубины поиска и количества ночей.
 */
export function extractOnlyHotelParams(target: HTMLLinkElement) {
	const raw = target.getAttribute("data-onlyhotel-lookup-destination-2");
	if (!raw) throw new Error("data-onlyhotel-lookup-destination is required");

	// Разбивает строку с названиями отелей по запятой и очищает пробелы
	const hotelNames = raw
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean);
	if (!hotelNames.length) throw new Error("No valid hotel names provided");

	// Получает глубину поиска и количество ночей, с fallback на значения по умолчанию
	const depthAttr = target.getAttribute("data-onlyhotel-lookup-depth-days-2");
	const nightsAttr = target.getAttribute("data-onlyhotel-lookup-nights-2");

	const depth = Number(depthAttr) || defaultDepthDays;
	const nights = Number(nightsAttr) || defaultNights;

	// Дополнительные фильтры поиска (если указаны)
	const filters =
		target.getAttribute("data-onlyhotel-lookup-filter-2") ?? null;

	return { hotelNames, depth, nights, filters };
}
