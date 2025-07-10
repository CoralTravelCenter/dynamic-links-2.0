import {extractOnlyHotelParams} from "./extractOnlyHotelParams";

import {redirectToOnlyHotel} from "./redirectToOnlyHotel";
import {calculateDates} from "../utils";

/**
 * Обрабатывает событие клика по кнопке поиска OnlyHotel
 * Извлекает параметры поиска, вычисляет даты и инициирует редирект
 *
 * @param target - HTML anchor элемент, по которому был выполнен клик
 */
export async function handleOnlyHotelClick(target: HTMLAnchorElement): Promise<void> {
    if (!target || !(target instanceof HTMLAnchorElement)) {
        return;
    }

    try {
        // Извлекаем и валидируем параметры поиска из DOM элемента
        const searchParams = extractOnlyHotelParams(target);
        const {hotelNames, depth, nights, filters} = searchParams;

        // Вычисляем даты поездки на основе глубины и продолжительности
        const dates = calculateDates(depth, nights);

        // Выполняем редирект на страницу бронирования OnlyHotel
        await redirectToOnlyHotel(hotelNames, dates, nights, filters);
    } catch (error) {
        // Тихо обрабатываем ошибку без показа пользователю
        // В production здесь можно добавить отправку ошибки в систему мониторинга
    }
}
