import {Filter, ReservationTypeParam} from "./types";

export const DEFAULT_DEPTH_DAYS: number = 14;
export const DEFAULT_NIGHTS: number = 7;

export const DOM_SELECTORS = {
    HEADER_CONTAINER: ".header-client-side-desktop",
    TEST_BUTTON: ".test-btn",
    TEST_BUTTONS_CONTAINER: ".test-buttons-container",
} as const;

export const HTML_ATTRIBUTES = {
    DESTINATION: "data-onlyhotel-lookup-destination-2",
    DEPTH_DAYS: "data-onlyhotel-lookup-depth-days-2",
    NIGHTS: "data-onlyhotel-lookup-nights-2",
    FILTER: "data-onlyhotel-lookup-filter-2",
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
    cg: {},
    price: {
        type: 15,
        values: [{id: "", value: "0-100000", parent: null}],
        providers: []
    }
};

export const RESERVATION_TYPE_PARAMS: ReservationTypeParam = {
    onlyHotel: "&p=2&w=0&s=0",
    package: "&p=1&w=0&s=0",
};

export const DEFAULT_DESTINATION = 'Турция';
export const DEFAULT_DESTINATION_RU = 'Россия';
export const DEFAULT_DEPARTURE = 'Москва';
export const DEFAULT_DEPARTURE_ID = '2671-5';
export const DEFAULT_DEPARTURE_FRIENDLY = 'moskva';

export const ARRIVAL_REGIONS = {
    ['Турция']: ['1-0', 'turtsiya'],
    ['ОАЭ']: ['31-0', 'oae'],
    ['Египет']: ['12-0', 'egipet'],
    ['Вьетнам']: ['41-0', 'vyetnam'],
    ['Куба']: ['48-0', 'kuba'],
    ['Маврикий']: ['63-0', 'mavrikiy'],
    ['Малайзия']: ['118-0', 'malayziya'],
    ['Мальдивы']: ['35-0', 'malydivy'],
    ['Марокко']: ['45-0', 'marokko'],
    ['Мексика']: ['98-0', 'meksika'],
    ['Россия']: ['3-0', 'rossiya'],
    ['Таиланд']: ['33-0', 'tailand'],
    ['Танзания']: ['60-0', 'tanzaniya'],
    ['Тунис']: ['34-0', 'tunis'],
    ['Узбекистан']: ['49-0', 'uzbekistan'],
    ['Филиппины']: ['251-0', 'filippiny'],
    ['Шри-Ланка']: ['40-0', 'shrilanka'],
    ['Азербайджан']: ['7-0', 'azerbaydzhan'],
    ['Армения']: ['5-0', 'armeniya'],
    ['Бахрейн']: ['282-0', 'bahreyn'],
    ['Беларусь']: ['8-0', 'belarus'],
    ['Болгария']: ['10-0', 'bolgariya'],
    ['Грузия']: ['15-0', 'gruziya'],
    ['Доминиканская Республика']: ['36-0', 'dominikanskayarespublika'],
    ['Индия']: ['52-0', 'indiya'],
    ['Греция']: ['43-0', 'gretsiya'],
    ['Абхазия']: ['278-0', 'abhaziya'],
    ['Андорра']: ['72-0', 'andorra'],
    ['Иордания']: ['58-0', 'iordaniya'],
    ['Испания']: ['112-3-42_72', 'barselona'],
    ['Индонезия']: ['38-0', 'indoneziya'],
    ['Италия']: ['18-0', 'italiya'],
    ['Казахстан']: ['19-0', 'kazahstan'],
    ['Кипр']: ['216-0', 'kipr'],
    ['Китай']: ['37-0', 'kitay'],
    ['Сейшелы']: ['39-0', 'seyshely'],
    ['Черногория']: ['80-0', 'chernogoriya'],
    ['Хорватия']: ['108-0', 'horvatiya'],
};
