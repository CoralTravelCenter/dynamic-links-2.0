// Параметры поиска по умолчанию
import {Filter} from "../types";

export const defaultDepthDays: number = 14; // Количество дней для поиска вперед по умолчанию
export const defaultNights: number = 7; // Количество ночей проживания по умолчанию

// CSS селекторы для поиска элементов в DOM
export const DOM_SELECTORS = {
    HEADER_CONTAINER: ".header-client-side-desktop", // Контейнер заголовка для десктопа
    TEST_BUTTON: ".test-btn", // Кнопка для тестирования
    TEST_BUTTONS_CONTAINER: ".test-buttons-container", // Контейнер с тестовыми кнопками
} as const;

// Типы локаций для поиска
export const LOCATION_TYPES = {
    COUNTRY: 0, // Тип локации: страна
    HOTEL: 7, // Тип локации: отель
} as const;

// Конфигурация для API запросов
export const API_CONFIG = {
    DEFAULT_PAGE_SIZE: 20, // Размер страницы по умолчанию для пагинации
    DEFAULT_SORT_TYPE: 0, // Тип сортировки по умолчанию
    DEFAULT_IMAGE_SIZES: [0], // Размеры изображений по умолчанию
    DEFAULT_PASSENGERS: [
        // Пассажиры по умолчанию (2 взрослых)
        {age: 20, passengerType: 0}, // Первый пассажир: возраст 20, тип "взрослый"
        {age: 20, passengerType: 0}, // Второй пассажир: возраст 20, тип "взрослый"
    ],
} as const;

// Типы фильтров для поиска
export const FILTER_TYPES = {
    availability: 21, // Фильтр по доступности
    meal: 5, // Фильтр по типу питания
    hotelConcept: 3, // Фильтр по концепции отеля
    hotelCategory: 2, // Фильтр по категории отеля (звездность)
    distanceToBeach: 25, // Фильтр по расстоянию до пляжа
    beachFacilities: 6 // Фильтр отелей с собственным пляжем
};

// Константы для города отправления по умолчанию
export const DEPARTURE_ID = "2671-5";
export const DEPARTURE_FRIENDLY = "moskva";

export const FILTERS_MAP: Record<string, Filter> = {
    // Фильтр по доступности (только доступные отели)
    available: {
        type: FILTER_TYPES.availability,
        values: [{id: "2", value: "2", parent: null}],
        providers: null,
    },
    // Фильтр "все включено" (AI - All Inclusive)
    ai: {
        type: FILTER_TYPES.meal,
        values: [
            {id: "1", value: "1", parent: null}, // Полупансион
            {id: "2", value: "2", parent: null}, // Полный пансион
        ],
        providers: [],
    },
    // Фильтр элитных отелей
    elite: {
        type: FILTER_TYPES.hotelConcept,
        values: [
            {id: "49", value: "49", parent: null}, // Премиум концепция
            {id: "1", value: "1", parent: null}, // Люкс концепция
        ],
        providers: null,
    },
    // Фильтр семейных отелей
    family: {
        type: FILTER_TYPES.hotelConcept,
        values: [{id: "5", value: "5", parent: null}],
        providers: null,
    },
    // Фильтр CFC (Coral Family Club) - клубные семейные отели
    cfc: {
        type: FILTER_TYPES.hotelConcept,
        values: [{id: "3", value: "3", parent: null}],
        providers: null,
    },
    // Фильтр CG (Coral Group) - золотые клубные отели
    cg: {
        type: FILTER_TYPES.hotelConcept,
        values: [{id: "39", value: "39", parent: null}],
        providers: null,
    },
    // Фильтр расстояния до пляжа: до 50 метров
    "50m": {
        type: FILTER_TYPES.distanceToBeach,
        values: [{id: "0-50", value: "0-50", parent: null}],
        providers: null,
    },
    // Фильтр расстояния до пляжа: 50-250 метров
    "250m": {
        type: FILTER_TYPES.distanceToBeach,
        values: [{id: "50-250", value: "50-250", parent: null}],
        providers: null,
    },
    // Фильтр отелей 5 звезд
    "5stars": {
        type: FILTER_TYPES.hotelCategory,
        values: [{id: "5", value: "5", parent: null}],
        providers: null,
    },
    // Фильтр отелей 4 звезды
    "4stars": {
        type: FILTER_TYPES.hotelCategory,
        values: [{id: "4", value: "4", parent: null}],
        providers: null,
    },
    // Фильтр отелей 3 звезды
    "3stars": {
        type: FILTER_TYPES.hotelCategory,
        values: [{id: "3", value: "3", parent: null}],
        providers: null,
    },
    // Фильтр отелей с собственным пляжем
    privatebeach: {
        type: FILTER_TYPES.beachFacilities,
        values: [{id: "32", value: "32", parent: null}],
        providers: null,
        parent: [{id: "3", value: "3", parent: null, providers: []}],
    },
};
