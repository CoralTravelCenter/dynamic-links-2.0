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
 * Парсит строку фильтров и возвращает массив объектов Filter
 *
 * @param filterStr - Ключи фильтров через запятую или null
 * @returns Массив объектов Filter, соответствующих запрошенным ключам
 */
export function addFilters(filterStr: string | null): Filter[] {
    const result: Filter[] = [];

    if (!filterStr) {
        return result;
    }

    const requestedFilters = filterStr
        .split(",")
        .map((filter) => filter.trim().toLowerCase())
        .filter(Boolean);

    for (const filterKey of requestedFilters) {
        if (FILTERS[filterKey]) {
            result.push(FILTERS[filterKey]);
        }
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
export function calculateDates(depth: number, nights: number): [string, string] {
    // Валидация входных параметров
    if (!Number.isInteger(depth) || depth < 0) {
        throw new Error("Depth must be a non-negative integer");
    }

    if (!Number.isInteger(nights) || nights <= 0) {
        throw new Error("Nights must be a positive integer");
    }

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
