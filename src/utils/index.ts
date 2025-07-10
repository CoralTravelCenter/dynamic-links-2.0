import {FILTERS_MAP} from "../constants";
import {Filter} from "../types";

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
            if (
                element instanceof HTMLElement &&
                element.getBoundingClientRect().height > 0
            ) {
                resolve();
            } else {
                setTimeout(checkReady, timeout);
            }
        };
        checkReady();
    });
}

/**
 * Парсит строку фильтров и возвращает массив объектов Filter
 *
 * @param filterStr - Ключи фильтров через запятую или null
 * @returns Массив объектов Filter, соответствующих запрошенным ключам
 */
export function addFilters(
    filterStr: string | null,
): Filter[] {
    const result: Filter[] = [];

    if (!filterStr) {
        return result;
    }

    const filtersMap = FILTERS_MAP

    const requestedFilters = filterStr
        .split(",")
        .map((filter) => filter.trim().toLowerCase())
        .filter(Boolean);

    for (const filterKey of requestedFilters) {
        if (filtersMap[filterKey]) {
            result.push(filtersMap[filterKey]);
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
 * Вычисляет даты начала и окончания поездки на основе глубины поиска и количества ночей
 *
 * @param depth - Количество дней вперед от текущей даты для начала поиска
 * @param nights - Количество ночей проживания
 * @returns Кортеж с датами начала и окончания в формате YYYY-MM-DD
 * @throws Error если параметры невалидные
 */
export function calculateDates(
    depth: number,
    nights: number,
): [string, string] {
    if (depth < 0) {
        throw new Error("Depth cannot be negative");
    }

    if (nights <= 0) {
        throw new Error("Nights must be a positive number");
    }

    const today = new Date();

    // Дата начала поездки (сегодня + depth дней)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + depth);

    // Дата окончания поездки (дата начала + nights дней)
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + nights);

    // Форматируем даты в формат YYYY-MM-DD
    const formatDate = (date: Date): string => {
        const ISODate = date.toISOString();
        return ISODate.split("T")[0]
    };

    return [formatDate(startDate), formatDate(endDate)];
}
