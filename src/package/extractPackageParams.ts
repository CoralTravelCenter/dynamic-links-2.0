import {DEFAULT_DEPTH_DAYS, DEFAULT_NIGHTS, HTML_ATTRIBUTES} from "../constants";
import {PackageSearchParams} from "../types";
import {parseIntSafe} from "../utils";

/**
 * Извлекает параметры поиска PackageTour из атрибутов HTML элемента
 *
 * @param target - HTML anchor элемент с data атрибутами
 * @returns Объект с параметрами поиска PackageTour
 * @throws Error если обязательный атрибут destination отсутствует или невалидный
 */
export function extractPackageParams(target: HTMLAnchorElement): PackageSearchParams {
    const destinationRaw = target.getAttribute(HTML_ATTRIBUTES.DESTINATION);
    if (!destinationRaw) {
        throw new Error(`Required attribute ${HTML_ATTRIBUTES.DESTINATION} is missing`);
    }

    // Парсим названия стран или регионов через запятую
    const destinationNames = destinationRaw
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean);

    if (!destinationNames.length) {
        throw new Error("No valid destination names provided in destination attribute");
    }

    // Извлекаем опциональные параметры
    const depthAttr = target.getAttribute(HTML_ATTRIBUTES.DEPTH_DAYS);
    const nightsAttr = target.getAttribute(HTML_ATTRIBUTES.NIGHTS);
    const filters = target.getAttribute(HTML_ATTRIBUTES.FILTER) ?? null;

    const depth = parseIntSafe(depthAttr, DEFAULT_DEPTH_DAYS);
    const nights = parseIntSafe(nightsAttr, DEFAULT_NIGHTS);

    return {destinationNames, depth, nights, filters};
}
