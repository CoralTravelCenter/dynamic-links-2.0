import { doRequestToServer, onlyHotelEndPoints } from "../api";
import { ArrivalLocation, OnlyHotelPriceSearchEncryptPayload } from "../types";
import { addFilters } from "../utils";

export async function fetchPriceSearchEncrypt(
	locations: ArrivalLocation[],
	dates: string[],
	nights: number,
	filters: string | null,
) {
	console.trace("fetchPriceSearchEncrypt called");
	const payload: OnlyHotelPriceSearchEncryptPayload = {
		beginDates: dates,
		arrivalLocations: locations,
		nights: [{ value: nights }],
		roomCriterias: [
			{
				passengers: [
					{ age: 20, passengerType: 0 },
					{ age: 20, passengerType: 0 },
				],
			},
		],
		reservationType: 2,
		paging: { pageNumber: 1, pageSize: 20, sortType: 0 },
		additionalFilters: addFilters(filters),
		imageSizes: [0],
		categories: [],
	};
	console.log(payload);
	doRequestToServer(onlyHotelEndPoints.PriceSearchEncrypt, payload, "POST");
}
