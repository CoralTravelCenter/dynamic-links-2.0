import {extractOnlyHotelParams} from "./extractOnlyHotelParams";
import {redirectToOnlyHotel} from "./redirectToOnlyHotel";
import {calculateDates} from "../utils";

/**
 * Клик по ссылке onlyhotel:
 * 1) парсим параметры;
 * 2) получаем [start,end] (period или расчёт через depth+nights);
 * 3) редирект.
 */
export async function handleOnlyHotelClick(target: HTMLAnchorElement): Promise<void> {
    if (!target || !(target instanceof HTMLAnchorElement)) return;

    const params = extractOnlyHotelParams(target);

    const dates: [string, string] =
        params.period ?? calculateDates(params.depth!, params.nights);

    await redirectToOnlyHotel(
        params.destination,
        dates,
        params.nights,
        params.filters
    );
}
