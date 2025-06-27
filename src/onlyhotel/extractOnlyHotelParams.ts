import {defaultDepthDays, defaultNights, ONLYHOTEL_HTML_ATTRIBUTES} from "../constants";
import {OnlyHotelSearchParams} from "../types";
import {parseIntSafe} from "../utils";

/**
 * Извлекает параметры поиска OnlyHotel из атрибутов HTML элемента
 *
 * @param target - HTML anchor элемент с data атрибутами
 * @returns Объект с параметрами поиска OnlyHotel
 * @throws Error если обязательный атрибут destination отсутствует или невалидный
 */
export function extractOnlyHotelParams(
    target: HTMLAnchorElement,
): OnlyHotelSearchParams {
    const destinationRaw = target.getAttribute(
        ONLYHOTEL_HTML_ATTRIBUTES.DESTINATION,
    );
    if (!destinationRaw) {
        throw new Error(
            `Required attribute ${ONLYHOTEL_HTML_ATTRIBUTES.DESTINATION} is missing`,
        );
    }

    // Парсим названия отелей из строки через запятую
    const hotelNames = destinationRaw
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean);

    if (!hotelNames.length) {
        throw new Error(
            "No valid hotel names provided in destination attribute",
        );
    }

    // Извлекаем опциональные параметры с безопасным парсингом
    const depthAttr = target.getAttribute(ONLYHOTEL_HTML_ATTRIBUTES.DEPTH_DAYS);
    const nightsAttr = target.getAttribute(ONLYHOTEL_HTML_ATTRIBUTES.NIGHTS);
    const filters =
        target.getAttribute(ONLYHOTEL_HTML_ATTRIBUTES.FILTER) ?? null;

    const depth = parseIntSafe(depthAttr, defaultDepthDays);
    const nights = parseIntSafe(nightsAttr, defaultNights);

    return {hotelNames, depth, nights, filters};
}
