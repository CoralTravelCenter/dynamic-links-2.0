import { ReservationTypeParam } from "./types";

// Параметры поиска по умолчанию
export const defaultDepthDays: number = 14; // Количество дней для поиска вперед по умолчанию
export const defaultNights: number = 7; // Количество ночей проживания по умолчанию

// CSS селекторы для поиска элементов в DOM
export const DOM_SELECTORS = {
	HEADER_CONTAINER: ".header-client-side-desktop", // Контейнер заголовка для десктопа
	TEST_BUTTON: ".test-btn", // Кнопка для тестирования
	TEST_BUTTONS_CONTAINER: ".test-buttons-container", // Контейнер с тестовыми кнопками
} as const;

// HTML атрибуты для общей функциональности
export const HTML_ATTRIBUTES = {
	DESTINATION: "data-lookup-destination", // Атрибут для хранения направления поиска
	DEPTH_DAYS: "data-lookup-depth-days", // Атрибут для количества дней поиска
	NIGHTS: "data-lookup-nights", // Атрибут для количества ночей
	FILTER: "data-lookup-filter", // Атрибут для фильтров поиска
} as const;

// Типы локаций для поиска
export const LOCATION_TYPES = {
	COUNTRY: 0, // Тип локации: страна
	HOTEL: 7, // Тип локации: отель
} as const;

// Типы фильтров для поиска отелей
export const FILTER_TYPES = {
	availability: 21, // Фильтр по доступности
	meal: 5, // Фильтр по типу питания
	hotelConcept: 3, // Фильтр по концепции отеля
	hotelCategory: 2, // Фильтр по категории отеля (звездность)
	distanceToBeach: 25, // Фильтр по расстоянию до пляжа
};

// Конфигурация для API запросов
export const API_CONFIG = {
	DEFAULT_PAGE_SIZE: 20, // Размер страницы по умолчанию для пагинации
	DEFAULT_SORT_TYPE: 0, // Тип сортировки по умолчанию
	DEFAULT_RESERVATION_TYPE: 2, // Тип бронирования по умолчанию
	DEFAULT_IMAGE_SIZES: [0], // Размеры изображений по умолчанию
	DEFAULT_PASSENGERS: [
		// Пассажиры по умолчанию (2 взрослых)
		{ age: 20, passengerType: 0 }, // Первый пассажир: возраст 20, тип "взрослый"
		{ age: 20, passengerType: 0 }, // Второй пассажир: возраст 20, тип "взрослый"
	],
} as const;

// Константы для города отправления
export const DEPARTURE_ID = "2671-5";
export const DEPARTURE_FRIENDLY = "moskva";

// Объект с регионами прибытия для пакетных туров
export const arrivalRegionsObject = {
	["Турция"]: ["1-0", "turtsiya"],
	["ОАЭ"]: ["31-0", "oae"],
	["Египет"]: ["12-0", "egipet"],
	["Вьетнам"]: ["41-0", "vyetnam"],
	["Куба"]: ["48-0", "kuba"],
	["Маврикий"]: ["63-0", "mavrikiy"],
	["Малайзия"]: ["118-0", "malayziya"],
	["Мальдивы"]: ["35-0", "malydivy"],
	["Марокко"]: ["45-0", "marokko"],
	["Мексика"]: ["98-0", "meksika"],
	["Россия"]: ["3-0", "rossiya"],
	["Таиланд"]: ["33-0", "tailand"],
	["Танзания"]: ["60-0", "tanzaniya"],
	["Тунис"]: ["34-0", "tunis"],
	["Узбекистан"]: ["49-0", "uzbekistan"],
	["Филиппины"]: ["251-0", "filippiny"],
	["Шри-Ланка"]: ["40-0", "shrilanka"],
	["Азербайджан"]: ["7-0", "azerbaydzhan"],
	["Армения"]: ["5-0", "armeniya"],
	["Бахрейн"]: ["282-0", "bahreyn"],
	["Беларусь"]: ["8-0", "belarus"],
	["Болгария"]: ["10-0", "bolgariya"],
	["Грузия"]: ["15-0", "gruziya"],
	["Доминиканская Республика"]: ["36-0", "dominikanskayarespublika"],
	["Индия"]: ["52-0", "indiya"],
	["Греция"]: ["43-0", "gretsiya"],
	["Абхазия"]: ["278-0", "abhaziya"],
	["Андорра"]: ["72-0", "andorra"],
	["Иордания"]: ["58-0", "iordaniya"],
	["Испания"]: ["112-3-42_72", "barselona"],
	["Индонезия"]: ["38-0", "indoneziya"],
	["Италия"]: ["18-0", "italiya"],
	["Казахстан"]: ["19-0", "kazahstan"],
	["Кипр"]: ["216-0", "kipr"],
	["Китай"]: ["37-0", "kitay"],
	["Сейшелы"]: ["39-0", "seyshely"],
	["Черногория"]: ["80-0", "chernogoriya"],
	["Хорватия"]: ["108-0", "horvatiya"],
} as const;

// Параметры URL для различных типов бронирования
export const reservationTypeParam: ReservationTypeParam = {
	onlyHotel: "&p=2&w=0&s=0", // Параметры для бронирования только отеля
	package: "&p=1&w=0&s=0", // Параметры для пакетного тура (отель + перелет)
};
