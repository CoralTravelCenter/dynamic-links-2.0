import {FILTERS} from "./constants";
import {ArrivalLocation, Filter, OnlyHotelArrivalLocationResponse, PackageArrivalLocationResponse} from "./types";

/**
 * Ожидает готовности React приложения, проверяя, что указанный элемент
 * отрендерился с положительной высотой
 *
 * @param selector - CSS селектор для контейнера React приложения
 * @param timeout - Максимальное время ожидания в миллисекундах
 * @returns Promise, который разрешается когда React приложение готово
 */
export async function hostReactAppReady(
    selector: string = "#__next > div",
    timeout: number = 200,
): Promise<void> {
    return new Promise((resolve) => {
        const checkReady = (): void => {
            const element = document.querySelector(selector);
            if (element instanceof HTMLElement && element.getBoundingClientRect().height > 0) {
                resolve();
            } else {
                setTimeout(checkReady, timeout);
            }
        };
        checkReady();
    });
}

/**
 * Форматирует объект Date в строку формата YYYY-MM-DD
 *
 * @param date - Объект Date для форматирования
 * @returns Отформатированная строка даты в формате YYYY-MM-DD
 */
export function formatDate(date: Date): string {
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date provided to formatDate");
    }
    return date.toISOString().split("T")[0];
}

/**
 * Преобразует объект фильтров (например { stars: ['5stars','4stars'], price: '0-150000' })
 * в массив Filter, всегда добавляя 'available' как базовый фильтр.
 */
export function addFilters(filtersObj: Record<string, any>): Filter[] {
    const result: Filter[] = [];

    // 1) всегда добавляем available
    if (FILTERS.available) {
        result.push(structuredClone(FILTERS.available));
    }

    if (!filtersObj || typeof filtersObj !== "object") {
        return result;
    }

    for (const [key, value] of Object.entries(filtersObj)) {
        const normalizedKey = key.toLowerCase();

        // массивы — набор конкретных ключей из FILTERS (например, stars)
        if (Array.isArray(value)) {
            for (const v of value) {
                const tpl = FILTERS[v.toLowerCase()];
                if (tpl) result.push(structuredClone(tpl));
            }
            continue;
        }

        // простые значения — подставляем в values[0].value, не мутируя словарь
        const template = FILTERS[normalizedKey];
        if (!template) continue;

        const filter = structuredClone(template);
        if (filter.values?.length) {
            filter.values[0].value = typeof value === "string" ? value : String(value);
        }
        result.push(filter);
    }

    return result;
}


/**
 * Безопасно парсит строку в целое число с fallback значением
 *
 * @param value - Строковое значение для парсинга
 * @param fallback - Значение по умолчанию, если парсинг не удался
 * @returns Распарсенное целое число или значение по умолчанию
 */
export function parseIntSafe(value: string | null, fallback: number): number {
    if (!value) return fallback;
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? fallback : parsed;
}

/**
 * Вычисляет даты начала и окончания поездки на основе глубины и продолжительности
 *
 * @param depth - Количество дней от сегодня до начала поездки
 * @param nights - Количество ночей для продолжительности поездки
 * @returns Кортеж содержащий [startDate, endDate] в формате YYYY-MM-DD
 * @throws Error если depth или nights невалидные
 */
export function calculateDates(depth: number | undefined, nights: number | undefined): [string, string] {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + depth);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + nights);

    return [formatDate(startDate), formatDate(endDate)];
}

/**
 * Фильтрует список ArrivalLocation, извлекая только те,
 * которые точно совпадают по имени с заданным списком,
 * и удаляет дубликаты по ID.
 *
 * @param {OnlyHotelArrivalLocationResponse[] | PackageArrivalLocationResponse[]} responses
 *   Список ответов API, каждый из которых содержит массив locations.
 *
 * @param {string[]} requestedNames
 *   Список названий локаций, которые нужно найти (без учёта регистра и лишних пробелов).
 *
 * @returns {ArrivalLocation[]}
 *   Массив уникальных ArrivalLocation, у которых имя совпало с одним из requestedNames.
 */
export function filterUniqueMatchingHotels(
    responses: OnlyHotelArrivalLocationResponse[] | PackageArrivalLocationResponse[],
    requestedNames: string[]
): ArrivalLocation[] {
    if (!responses?.length || !requestedNames?.length) return [];

    const requestedSet = new Set(
        requestedNames.map(name => name.trim().toUpperCase()).filter(Boolean)
    );
    if (!requestedSet.size) return [];

    const uniqueMap = new Map<string, ArrivalLocation>();

    for (const response of responses) {
        for (const location of response?.result?.locations || []) {
            const normalizedName = location.name.trim().toUpperCase();
            if (requestedSet.has(normalizedName)) {
                uniqueMap.set(location.id, location);
            }
        }
    }

    return [...uniqueMap.values()];
}


function normalizeJsonish(input: string): string {
    let s = input.replace(/'/g, '"');
    s = s.replace(/([{,]\s*)([A-Za-z0-9_]+)\s*:/g, '$1"$2":');
    return s;
}

export function parseFilters(filtersAttr: string | null): Record<string, unknown> | null {
    if (!filtersAttr) return null;
    try {
        return JSON.parse(filtersAttr);
    } catch {
    }
    try {
        return JSON.parse(normalizeJsonish(filtersAttr));
    } catch {
    }
    return {raw: filtersAttr};
}
