export interface OnlyHotelArrivalLocationPayload {
    text: string,
    locationTypes?: number[]
}

export interface OnlyHotelArrivalLocationResponse {
    result: {
        locations: LocationItem[];
    };
    meta?: Meta
}

export interface OnlyHotelPriceSearchEncryptPayload {
    reservationType: number;
    beginDates: string[];
    nights: Night[];
    roomCriterias: RoomCriteria[];
    arrivalLocations: ArrivalLocation[];
    paging: Paging;
    imageSizes: number[];
    categories: Category[];
    additionalFilters: AdditionalFilter[];
}

export interface OnlyHotelPriceSearchEncryptResponse {
    meta?: RedirectionMeta;
    result: RedirectionResult;
}

export interface LocationItem {
    id: string;
    type: number;
    name: string;
    friendlyUrl: string;
    parent: ParentLocation;
}

interface ParentLocation {
    id: string;
    type: number;
    name: string;
    countryId: string;
}

interface Meta {
    responseDateTime: string; // ISO 8601
    elapsedTime: string;      // Format: HH:mm:ss
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

export interface ArrivalLocation {
    id: string;
    type: number;
    name: string;
    friendlyUrl: string;
    tourId?: number;
    transportPointId?: number;
    parent: ParentLocation;
    children: string[] | null;
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

interface AdditionalFilter {
    type: number;
    values: FilterValue[];
    providers: string[];
}

interface FilterValue {
    id: string;
    value: string;
    parent: string;
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
