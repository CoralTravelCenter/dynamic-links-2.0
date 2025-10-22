import {DEFAULT_DEPTH_DAYS, DEFAULT_NIGHTS, HTML_ATTRIBUTES} from "../constants";
import {PackageSearchParams} from "../types";

/**
 * Извлекает параметры поиска PackageTour из атрибутов HTML элемента
 *
 * @param target - HTML anchor элемент с data атрибутами
 * @returns Объект с параметрами поиска PackageTour
 * @throws Error если обязательный атрибут destination отсутствует или невалидный
 */
export function extractPackageParams(target: HTMLAnchorElement): PackageSearchParams {
    if (!target) throw new Error("Target element is missing");

    // 1) destination
    const destinationAttr = target.getAttribute(HTML_ATTRIBUTES.DESTINATION);
    if (!destinationAttr) {
        throw new Error(`Required attribute ${HTML_ATTRIBUTES.DESTINATION} is missing`);
    }
    const destination = destinationAttr.split(",").map(d => d.trim()).filter(Boolean);

    // 2) период и/или depth+nights
    const periodAttr = target.getAttribute(HTML_ATTRIBUTES.PERIOD);
    const depthAttr = target.getAttribute(HTML_ATTRIBUTES.DEPTH_DAYS);
    const nightsAttr = target.getAttribute(HTML_ATTRIBUTES.NIGHTS);

    // nights считаем ВСЕГДА (с дефолтом)
    {
        const parsedN = Number.parseInt(nightsAttr ?? "", 10);
        var nights = Number.isFinite(parsedN) ? parsedN : DEFAULT_NIGHTS;
    }

    let period: [string, string] | undefined;
    if (periodAttr) {
        const parts = periodAttr
            .replace(/[\[\]\s'"]/g, "")
            .split(",")
            .map(s => s.trim());

        if (parts.length !== 2 || !parts[0] || !parts[1]) {
            throw new Error(`Invalid format in ${HTML_ATTRIBUTES.PERIOD}`);
        }
        period = [parts[0], parts[1]];
    }

    // depth нужен ТОЛЬКО если period отсутствует
    let depth: number | undefined;
    if (!period) {
        const parsedD = Number.parseInt(depthAttr ?? "", 10);
        depth = Number.isFinite(parsedD) ? parsedD : DEFAULT_DEPTH_DAYS;
    }

    // 3) filters
    const filterAttr = target.getAttribute(HTML_ATTRIBUTES.FILTER);
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

    // 4) итог
    return {
        destination,
        filters,
        nights,
        ...(period ? {period} : {depth: depth!}),
    };
}
