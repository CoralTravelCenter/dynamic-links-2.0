/**
 * Вычисляет даты начала и окончания поездки на основе глубины поиска и количества ночей
 *
 * @param depth - Количество дней вперед от текущей даты для начала поиска
 * @param nights - Количество ночей проживания
 * @returns Кортеж с датами начала и окончания в формате YYYY-MM-DD
 * @throws Error если параметры невалидные
 */
export function calculateDates(depth: number, nights: number): [string, string] {
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
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	};

	return [formatDate(startDate), formatDate(endDate)];
}
