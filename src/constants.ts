import {Filter, ReservationTypeParam} from "./types";

export const DEFAULT_DEPTH_DAYS: number = 14;
export const DEFAULT_NIGHTS: number = 7;

export const HTML_ATTRIBUTES = {
    TYPE: "data-search-type",              // тип поиска: package | onlyhotel | onlyflight
    DESTINATION: "data-search-destination",// направление (страна, город, курорт и т.п.)
    DEPTH_DAYS: "data-search-depth-days",  // глубина поиска в днях
    NIGHTS: "data-search-nights",          // количество ночей
    PERIOD: "data-search-period",          // диапазон дат, формат: [YYYY-MM-DD, YYYY-MM-DD]
    FILTER: "data-search-filter",          // фильтры: JSON-строка ({stars, price, ...})
} as const;

export const LOCATION_TYPES = {
    COUNTRY: 0,
    HOTEL: 7,
} as const;

export const API_CONFIG = {
    DEFAULT_PAGE_SIZE: 20,
    DEFAULT_SORT_TYPE: 0,
    DEFAULT_RESERVATION_TYPE: 2,
    DEFAULT_IMAGE_SIZES: [0],
    DEFAULT_PASSENGERS: [
        {age: 20, passengerType: 0},
        {age: 20, passengerType: 0},
    ],
} as const;

export const FILTERS: Record<string, Filter> = {
    available: {
        type: 21,
        values: [{id: "2", value: "2", parent: null}],
        providers: null,
    },
    ai: {
        type: 5,
        values: [
            {id: "1", value: "1", parent: null},
            {id: "2", value: "2", parent: null},
        ],
        providers: [],
    },
    elite: {
        type: 3,
        values: [
            {id: "49", value: "49", parent: null},
            {id: "1", value: "1", parent: null},
        ],
        providers: null,
    },
    family: {
        type: 3,
        values: [{id: "5", value: "5", parent: null}],
        providers: null,
    },
    "50m": {
        type: 25,
        values: [{id: "0-50", value: "0-50", parent: null}],
        providers: null,
    },
    "250m": {
        type: 25,
        values: [{id: "50-250", value: "50-250", parent: null}],
        providers: null,
    },
    "5stars": {
        type: 2,
        values: [{id: "5", value: "5", parent: null}],
        providers: null,
    },
    "4stars": {
        type: 2,
        values: [{id: "4", value: "4", parent: null}],
        providers: null,
    },
    "3stars": {
        type: 2,
        values: [{id: "3", value: "3", parent: null}],
        providers: null,
    },
    privatebeach: {
        type: 6,
        values: [{id: "32", value: "32", parent: null}],
        providers: null,
        parent: [{id: "3", value: "3", parent: null, providers: []}],
    },
    cfc: {
        type: 3,
        values: [{id: "3", value: "3", parent: null}],
        providers: null,
    },
    cg: {
        type: 3,
        values: [{id: "39", value: "39", parent: null}],
        providers: [],
    },
    price: {
        type: 15,
        values: [{id: "", value: "0-100000", parent: null}], // подменяем value динамически
        providers: [],
    },
};

export const RESERVATION_TYPE_PARAMS: ReservationTypeParam = {
    onlyHotel: "&p=2&w=0&s=0",
    package: "&p=1&w=0&s=0",
};

export const DEFAULT_DEPARTURE = 'Москва';
export const DEFAULT_DEPARTURE_ID = '2671-5';
export const DEFAULT_DEPARTURE_FRIENDLY = 'moskva';
