export const onlyHotelEndPoints = {
	listArrivalLocations: "/OnlyHotelProduct/ListArrivalLocations",
	PriceSearchEncrypt: "/OnlyHotelProduct/PriceSearchEncrypt",
};

function endpointUrl(endpoint: string): string {
	const isLocalhost = location.hostname === "localhost";
	const host = isLocalhost
		? "http://localhost:8010/proxy"
		: "//" + location.hostname.replace(/^(www|new)/, "b2capi");

	return `${host}${endpoint}`;
}

export async function doRequestToServer<T>(
	endpoint: string,
	data: any,
	method: "POST" | "GET" = "POST",
): Promise<T> {
	const url = endpointUrl(endpoint);

	const response = await fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error(`API Error: ${response.status} ${response.statusText}`);
	}

	return (await response.json()) as T;
}
