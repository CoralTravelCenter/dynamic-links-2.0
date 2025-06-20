import {defaultDepthDays, defaultNights} from "../constants";
import {formatDate} from "../utils";
import {requestOnlyHotelRedirect} from "./requestOnlyHotelRedirect";

export function handleOnlyHotelClick(target: HTMLElement) {
    // Получаем названия отелей, или отеля, из атрибута
    const raw = target.getAttribute("data-onlyhotel-lookup-destination-2");

    if (!raw) {
        console.warn("data-onlyhotel-lookup-destination is required");
        return;
    }

    // Обработка нескольких отелей, разделенных запятыми
    const hotelNames: string[] = raw.split(",").map((s) => s.trim());

    if (!hotelNames.length) {
        console.warn("No valid hotel names provided");
        return;
    }

    // Получаем параметры поиска с валидацией
    const depthAttr = target.getAttribute("data-onlyhotel-lookup-depth-days-2");
    const nightsAttr = target.getAttribute("data-onlyhotel-lookup-nights-2");

    const depth = Number(depthAttr) || defaultDepthDays;
    const nights = Number(nightsAttr) || defaultNights;

    // Поддержка нескольких фильтров, например: "5stars,4stars,ai"
    const filters: string | null = target.getAttribute("data-onlyhotel-lookup-filter-2") ?? null;

    // Вычисляем даты начала и окончания поездки
    // Берем текущую дату и прибавляем количество дней глубины поиска
    const start = new Date();
    start.setDate(start.getDate() + depth);

    const end = new Date(start);
    end.setDate(end.getDate() + nights);

    const dates: [string, string] = [formatDate(start), formatDate(end)];

    // Выполняем запрос на редирект
    try {
        requestOnlyHotelRedirect(hotelNames, dates, nights, filters).then(url => window.open(url, "_blank"))
    } catch (error) {
        console.error("Failed to redirect to OnlyHotel:", error);
    }
}
