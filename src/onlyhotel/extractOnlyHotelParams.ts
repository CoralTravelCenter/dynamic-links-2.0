import {DEFAULT_DEPTH_DAYS, DEFAULT_NIGHTS, HTML_ATTRIBUTES} from "../constants";
import type {OnlyHotelSearchParams} from "../types";

/**
 * Извлекает параметры OnlyHotel из data-атрибутов ссылки.
 * Правило: если указан period — depth игнорируем, а nights учитываем всегда.
 */
export function extractOnlyHotelParams(target: HTMLAnchorElement): OnlyHotelSearchParams {
    if (!target) throw new Error("Target element is missing");

    // destination
    const destinationAttr = target.getAttribute(HTML_ATTRIBUTES.DESTINATION);
    if (!destinationAttr) {
        throw new Error(`Required attribute ${HTML_ATTRIBUTES.DESTINATION} is missing`);
    }
    const destination = destinationAttr.split(",").map(d => d.trim()).filter(Boolean);

    // читаем атрибуты
    const periodAttr = target.getAttribute(HTML_ATTRIBUTES.PERIOD);
    const depthAttr = target.getAttribute(HTML_ATTRIBUTES.DEPTH_DAYS);
    const nightsAttr = target.getAttribute(HTML_ATTRIBUTES.NIGHTS);
    const filterAttr = target.getAttribute(HTML_ATTRIBUTES.FILTER);

    // nights считаем ВСЕГДА (с дефолтом)
    const parsedN = Number.parseInt(nightsAttr ?? "", 10);
    const nights = Number.isFinite(parsedN) ? parsedN : DEFAULT_NIGHTS;

    // period (если указан) → кортеж дат
    let period: [string, string] | undefined;
    if (periodAttr) {
        const parts = periodAttr
            .replace(/[\[\]\s'"]/g, "")
            .split(",")
            .map(s => s.trim());
        if (parts.length !== 2 || !parts[0] || !parts[1]) {
            throw new Error(`Invalid format in ${HTML_ATTRIBUTES.PERIOD}`);
        }
        // при желании можно авто-упорядочить: if (parts[0] > parts[1]) parts.reverse();
        period = [parts[0], parts[1]];
    }

    // depth — только если period отсутствует
    let depth: number | undefined;
    if (!period) {
        const parsedD = Number.parseInt(depthAttr ?? "", 10);
        depth = Number.isFinite(parsedD) ? parsedD : DEFAULT_DEPTH_DAYS;
    }

    // filters: JSON или "почти JSON"
    let filters: Record<string, unknown> | { raw: string } | null = null;
    if (filterAttr) {
        try {
            filters = JSON.parse(filterAttr);
        } catch {
            try {
                const normalized = filterAttr
                    .replace(/'/g, '"')
                    .replace(/([{,]\s*)([A-Za-z0-9_]+)\s*:/g, '$1"$2":');
                filters = JSON.parse(normalized);
            } catch {
                filters = {raw: filterAttr};
            }
        }
    }

    return {
        destination,
        filters,
        nights,
        ...(period ? {period} : {depth: depth!}),
    };
}
