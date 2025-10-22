export const ONLY_HOTEL_ENDPOINTS = {
    LIST_ARRIVAL_LOCATIONS: "/endpoints/OnlyHotelProduct/ListArrivalLocations",
    PRICE_SEARCH_ENCRYPT: "/endpoints/OnlyHotelProduct/PriceSearchEncrypt",
} as const;

export const PACKAGE_ENDPOINTS = {
    LIST_ARRIVAL_LOCATIONS: "/endpoints/PackageTourHotelProduct/ListArrivalLocations",
    LIST_AVAILABLE_DATES: "/endpoints/PackageTourHotelProduct/ListAvailableDates",
    LIST_AVAILABLE_NIGHTS: "/endpoints/PackageTourHotelProduct/ListAvailableNights",
    PRICE_SEARCH_ENCRYPT: "/endpoints/PackageTourHotelProduct/PriceSearchEncrypt",
} as const;

export async function doRequestToServer<T, U>(
    endpoint: string,
    data: U,
    method: "POST" | "GET" = "POST",
): Promise<T> {
    try {
        const url = endpoint;

        console.log(`API Request: ${method} ${url}`, data ? {payload: data} : {});

        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error(`API Error: ${response.status} ${response.statusText} for ${endpoint}`);
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const result = (await response.json()) as T;
        console.log(`API Response: ${method} ${url}`, {data: result});

        return result;
    } catch (error) {
        console.error(`Error in doRequestToServer for endpoint ${endpoint}:`, error);
        throw error;
    }
}
