import {redirectToPackage} from "./redirectToPackage";
import {calculateDates} from "../utils";
import {extractOnlyHotelParams} from "../onlyhotel/extractOnlyHotelParams";

/**
 * Обрабатывает событие клика по кнопке поиска PackageTour
 */
export async function handlePackageClick(target: HTMLAnchorElement): Promise<void> {
    if (!target || !(target instanceof HTMLAnchorElement)) {
        return;
    }

    try {
        const searchParams = extractOnlyHotelParams(target);
        if (searchParams.period) {
            await redirectToPackage(searchParams.destination, searchParams.period, searchParams.nights, searchParams.filters);
        } else {
            const dates: [string, string] = calculateDates(searchParams.depth, searchParams.nights);
            await redirectToPackage(searchParams.destination, dates, searchParams.nights, searchParams.filters);
        }
    } catch (error) {
        console.log(error);
    }
}
