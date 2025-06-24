import { defaultDepthDays, defaultNights } from "../constants";
import { PACKAGE_HTML_ATTRIBUTES } from "../constants/package";
import { PackageSearchParams } from "../types";
import { parseIntSafe } from "../utils";

/**
 * Извлекает параметры поиска пакетных туров из атрибутов HTML элемента
 *
 * @param target - HTML anchor элемент с data атрибутами
 * @returns Объект с параметрами поиска пакетных туров
 * @throws Error если обязательный атрибут destination отсутствует или невалидный
 */
export function extractPackageParams(
	target: HTMLAnchorElement,
): PackageSearchParams {
	const destinationRaw = target.getAttribute(
		PACKAGE_HTML_ATTRIBUTES.DESTINATION,
	);
	if (!destinationRaw) {
		throw new Error(
			`Required attribute ${PACKAGE_HTML_ATTRIBUTES.DESTINATION} is missing`,
		);
	}

	// Для пакетных туров destination обычно одно название страны или региона
	const destination = destinationRaw.trim();

	if (!destination) {
		throw new Error(
			"No valid destination provided in destination attribute",
		);
	}

	// Извлекаем опциональные параметры с безопасным парсингом
	const depthAttr = target.getAttribute(PACKAGE_HTML_ATTRIBUTES.DEPTH_DAYS);
	const nightsAttr = target.getAttribute(PACKAGE_HTML_ATTRIBUTES.NIGHTS);
	const filters = target.getAttribute(PACKAGE_HTML_ATTRIBUTES.FILTER) ?? null;

	const depth = parseIntSafe(depthAttr, defaultDepthDays);
	const nights = parseIntSafe(nightsAttr, defaultNights);

	return { destination, depth, nights, filters };
}
