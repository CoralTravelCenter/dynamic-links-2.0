export const ONLY_HOTEL_ENDPOINTS = {
	LIST_ARRIVAL_LOCATIONS: "/OnlyHotelProduct/ListArrivalLocations",
	PRICE_SEARCH_ENCRYPT: "/OnlyHotelProduct/PriceSearchEncrypt",
} as const;

// API response status codes
export const HTTP_STATUS = {
	OK: 200,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
} as const;

function endpointUrl(endpoint: string): string {
	const isLocalhost = location.hostname === "localhost";
	const host = isLocalhost
		? "http://localhost:8010/proxy"
		: "//" + location.hostname.replace(/^(www|new)/, "b2capi");

	return `${host}${endpoint}`;
}

export async function doRequestToServer<T, U>(
	endpoint: string,
	data: U,
	method: "POST" | "GET" = "POST",
): Promise<T> {
	try {
		const url = endpointUrl(endpoint);

		console.log(`API Request: ${method} ${url}`, data ? { payload: data } : {});

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
		console.log(`API Response: ${method} ${url}`, { data: result });

		return result;
	} catch (error) {
		console.error(`Error in doRequestToServer for endpoint ${endpoint}:`, error);
		throw error;
	}
}
