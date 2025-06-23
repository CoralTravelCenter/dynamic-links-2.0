import { formatDate } from "../utils";

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
