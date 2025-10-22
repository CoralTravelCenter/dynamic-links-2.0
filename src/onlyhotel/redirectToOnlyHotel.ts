import {requestOnlyHotelRedirect} from "./requestOnlyHotelRedirect";

/**
 * Выполняет редирект на URL бронирования OnlyHotel
 */
export async function redirectToOnlyHotel(
    hotelNames: string[],
    dates: [string, string],
    nights: number,
    filters: Record<string, unknown> | { raw: string } | null,
): Promise<void> {
    if (!Array.isArray(hotelNames) || hotelNames.length === 0) {
        throw new Error("hotelNames must be a non-empty array");
    }
    if (!Array.isArray(dates) || dates.length !== 2 || !dates[0] || !dates[1]) {
        throw new Error("dates must be a tuple ['YYYY-MM-DD','YYYY-MM-DD']");
    }
    if (!Number.isFinite(nights) || nights <= 0) {
        throw new Error("nights must be a positive number");
    }

    const redirectUrl = await requestOnlyHotelRedirect(hotelNames, dates, nights, filters);
    if (!redirectUrl) throw new Error("Failed to generate redirect URL");

    window.open(redirectUrl, "_blank", "noopener,noreferrer");
}
