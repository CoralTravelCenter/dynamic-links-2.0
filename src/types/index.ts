interface ParentLocation {
	id: string;
	type: number;
	name: string;
	countryId: string;
}

// Utility types
export type LocationType = 0 | 7; // 0 = Country, 7 = Hotel
export type ReservationType = 1 | 2; // 1 = Package, 2 = OnlyHotel
export type PassengerType = 0 | 1; // 0 = Adult, 1 = Child

interface Meta {
	responseDateTime: string; // ISO 8601
	elapsedTime: string; // Format: HH:mm:ss
	statusCode: number;
	correlation: string;
	multiLanguageEnabled: boolean;
}

interface Night {
	value: number;
}

interface RoomCriteria {
	passengers: Passenger[];
}

interface Passenger {
	passengerType: number;
	age: number;
	birthDate?: string;
}

interface Paging {
	hasPreviousPage?: boolean;
	hasNextPage?: boolean;
	pageNumber: number;
	pageSize: number;
	sortType: number;
}

interface Category {
	id: string;
	type: number;
}

interface FilterValue {
	id: string;
	value: string;
	parent: string | null;
	providers?: string[];
}

export interface Filter {
	type: number;
	values: FilterValue[];
	providers: string[] | null;
	parent?: FilterValue[];
}

interface RedirectionMeta {
	responseDateTime: string; // ISO формат даты-времени
	elapsedTime: string;
	statusCode: number;
	redirectionUrl: string;
	returnCallbackUrl: string;
	oldUrl: string;
	redirectionLanguageCode: string;
	messages: RedirectionMessage[];
	correlation: string;
	multiLanguageEnabled: boolean;
}

interface RedirectionMessage {
	type: number;
	message: string;
	messageCode: string;
	provider: number;
}

interface RedirectionResult {
	redirectionUrl: string;
	queryParam: string;
}

export interface ArrivalLocation {
	id: string;
	type: number;
	name: string;
	friendlyUrl: string;
	parent: ParentLocation;
	children: any[];
}

export interface OnlyHotelArrivalLocationPayload {
	text: string;
	locationTypes?: number[];
}

export interface OnlyHotelArrivalLocationResponse {
	result: {
		locations: ArrivalLocation[];
	};
	meta?: Meta;
}

export interface OnlyHotelPriceSearchEncryptPayload {
	reservationType: ReservationType;
	beginDates: string[];
	nights: Night[];
	roomCriterias: RoomCriteria[];
	paging: Paging;
	imageSizes: number[];
	categories: Category[];
	additionalFilters: Filter[];
	arrivalLocations?: ArrivalLocation[];
	departureLocations?: string[];
}

// Search parameters extracted from DOM
export interface OnlyHotelSearchParams {
	hotelNames: string[];
	depth: number;
	nights: number;
	filters: string | null;
}

// Configuration for OnlyHotel button
export interface OnlyHotelButtonConfig {
	destination: string;
	filter?: string;
	depthDays: number;
	nights: number;
}

export interface OnlyHotelPriceSearchEncryptResponse {
	meta?: RedirectionMeta;
	result: RedirectionResult;
}

export interface ReservationTypeParam {
	onlyHotel: string;
	package: string;
}

export interface HotelPayload extends OnlyHotelPriceSearchEncryptPayload {
	arrivalLocations: ArrivalLocation[];
}

export interface CountryPayload extends OnlyHotelPriceSearchEncryptPayload {
	departureLocations: string[];
}

// Type guards
export const isCountryLocation = (location: ArrivalLocation): boolean => location.type === 0;
export const isHotelLocation = (location: ArrivalLocation): boolean => location.type === 7;
