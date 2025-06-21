import {formatDate} from "../utils";

/**
 * Вычисляет дату начала поездки (через `depth` дней от текущей даты)
 * и дату окончания (через `nights` ночей от даты начала).
 * Возвращает отформатированные строки дат.
 */
export function calculateDates(depth: number, nights: number): [string, string] {
	const start = new Date();
	start.setDate(start.getDate() + depth);

	const end = new Date(start);
	end.setDate(end.getDate() + nights);

	return [formatDate(start), formatDate(end)];
}