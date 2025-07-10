import {extractPackageParams} from "./extractPackageParams";
import {redirectToPackage} from "./redirectToPackage";
import {calculateDates} from "../utils";
import {FILTERS} from "../constants";

/**
 * Обрабатывает событие клика по кнопке поиска PackageTour
 */
export async function handlePackageClick(target: HTMLAnchorElement): Promise<void> {
    if (!target || !(target instanceof HTMLAnchorElement)) {
        return;
    }

    try {
        const searchParams = extractPackageParams(target);
        const {destinationNames, depth, nights, filters} = searchParams;

        console.log(searchParams);

        const dates = calculateDates(depth, nights);

        // === Формируем массив фильтров ===
        const filtersArray = [FILTERS.available]; // always include available

        if (filters) {
            const filterParts = filters
                .split(",")
                .map(f => f.trim().toLowerCase())
                .filter(Boolean);

            for (const part of filterParts) {
                const priceMatch = part.match(/^price\[(.+)\]$/);
                if (priceMatch) {
                    const range = priceMatch[1];
                    filtersArray.push({
                        ...FILTERS.price,
                        values: [{id: range, value: range, parent: null}],
                    });
                } else if (FILTERS[part]) {
                    filtersArray.push(FILTERS[part]);
                }
            }
        }

        // === Редирект с уже подготовленными фильтрами ===
        await redirectToPackage(destinationNames, dates, nights, filtersArray);
    } catch (error) {
        // Можно залогировать в monitoring
    }
}
