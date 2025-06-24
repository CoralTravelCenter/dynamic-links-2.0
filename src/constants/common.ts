// Параметры поиска по умолчанию
export const defaultDepthDays: number = 14; // Количество дней для поиска вперед по умолчанию
export const defaultNights: number = 7; // Количество ночей проживания по умолчанию

// CSS селекторы для поиска элементов в DOM
export const DOM_SELECTORS = {
	HEADER_CONTAINER: ".header-client-side-desktop", // Контейнер заголовка для десктопа
	TEST_BUTTON: ".test-btn", // Кнопка для тестирования
	TEST_BUTTONS_CONTAINER: ".test-buttons-container", // Контейнер с тестовыми кнопками
} as const;

// HTML атрибуты для функциональности
export const HTML_ATTRIBUTES = {
	DESTINATION: "data-destination", // Атрибут для хранения направления поиска
	DEPTH_DAYS: "data-depth-days", // Атрибут для количества дней поиска
	NIGHTS: "data-nights", // Атрибут для количества ночей
	FILTER: "data-filter", // Атрибут для фильтров поиска
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
		{ age: 20, passengerType: 0 }, // Первый пассажир: возраст 20, тип "взрослый"
		{ age: 20, passengerType: 0 }, // Второй пассажир: возраст 20, тип "взрослый"
	],
} as const;

// Типы фильтров для поиска отелей
export const FILTER_TYPES = {
	availability: 21, // Фильтр по доступности
	meal: 5, // Фильтр по типу питания
	hotelConcept: 3, // Фильтр по концепции отеля
	hotelCategory: 2, // Фильтр по категории отеля (звездность)
	distanceToBeach: 25, // Фильтр по расстоянию до пляжа
};

// Константы для города отправления
export const DEPARTURE_ID = "2671-5";
export const DEPARTURE_FRIENDLY = "moskva";
