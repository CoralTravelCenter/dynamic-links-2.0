interface ParentLocation {
    id: string;
    type: number;
    name: string;
    countryId: string;
}

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

interface AdditionalFilter {
    type: number;
    values: FilterValue[];
    providers: string[] | null;
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
    children: [];
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

export interface ReservationTypeParam {
    onlyHotel: string,
    package: string,
}
