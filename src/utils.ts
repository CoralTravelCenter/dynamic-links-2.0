import { filters } from "./constants";
import { Filter } from "./types";

// Default React app selector
const DEFAULT_REACT_SELECTOR = "#__next > div";
const DEFAULT_CHECK_INTERVAL = 200;
const DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Ожидает готовности React приложения, проверяя, что указанный элемент
 * отрендерился с положительной высотой
 *
 * @param selector - CSS селектор для контейнера React приложения
 * @param timeout - Максимальное время ожидания в миллисекундах
 * @returns Promise, который разрешается когда React приложение готово
 */
export async function hostReactAppReady(
	selector: string = DEFAULT_REACT_SELECTOR,
	timeout: number = DEFAULT_CHECK_INTERVAL,
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
	if (!(date instanceof Date) || isNaN(date.getTime())) {
		throw new Error("Invalid date provided to formatDate");
	}
	return date.toISOString().split("T")[0];
}

/**
 * Проверяет, соответствует ли строка формату YYYY-MM-DD
 *
 * @param dateString - Строка даты для проверки
 * @returns True если формат даты валидный, иначе false
 */
export function isValidDateFormat(dateString: string): boolean {
	return DATE_FORMAT_REGEX.test(dateString);
}

/**
 * Парсит строку фильтров и возвращает массив объектов Filter
 *
 * @param filterStr - Ключи фильтров через запятую или null
 * @returns Массив объектов Filter, соответствующих запрошенным ключам
 */
export function addFilters(filterStr: string | null): Filter[] {
	const result: Filter[] = [];

	if (!filterStr || typeof filterStr !== "string") {
		return result;
	}

	const requestedFilters = filterStr
		.split(",")
		.map((filter) => filter.trim().toLowerCase())
		.filter(Boolean);

	for (const filterKey of requestedFilters) {
		if (filters[filterKey]) {
			result.push(filters[filterKey]);
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
