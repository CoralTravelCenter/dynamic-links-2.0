import { extractPackageParams } from "./extractPackageParams";
import { calculateDates } from "./calculateDates";
import { redirectToPackage } from "./redirectToPackage";

/**
 * Обрабатывает событие клика по кнопке поиска пакетных туров
 * Извлекает параметры поиска, вычисляет даты и инициирует редирект
 *
 * @param target - HTML anchor элемент, по которому был выполнен клик
 */
export async function handlePackageClick(
	target: HTMLAnchorElement,
): Promise<void> {
	if (!target || !(target instanceof HTMLAnchorElement)) {
		return;
	}

	try {
		// Извлекаем и валидируем параметры поиска из DOM элемента
		const searchParams = extractPackageParams(target);
		const { destination, depth, nights, filters } = searchParams;

		// Вычисляем даты поездки на основе глубины и продолжительности
		const dates = calculateDates(depth, nights);

		// Выполняем редирект на страницу бронирования пакетных туров
		await redirectToPackage(destination, dates, nights, filters);
	} catch (error) {
		// Тихо обрабатываем ошибку без показа пользователю
		// В production здесь можно добавить отправку ошибки в систему мониторинга
	}
}
