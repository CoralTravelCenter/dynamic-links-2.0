import { Filter } from "../types";

// Конфигурация для Package API запросов
export const PACKAGE_API_CONFIG = {
	DEFAULT_RESERVATION_TYPE: 1, // Тип бронирования по умолчанию для пакетных туров
} as const;

// HTML атрибуты для функциональности пакетных туров
export const PACKAGE_HTML_ATTRIBUTES = {
	DESTINATION: "data-package-destination", // Атрибут для хранения направления поиска
	DEPTH_DAYS: "data-package-depth-days", // Атрибут для количества дней поиска
	NIGHTS: "data-package-nights", // Атрибут для количества ночей
	FILTER: "data-package-filter", // Атрибут для фильтров поиска
} as const;

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

// Карта фильтров для пакетных туров (может отличаться от OnlyHotel)
export const packageFiltersMap: Record<string, Filter> = {
	// Фильтр по доступности (только доступные предложения)
	available: {
		type: 21,
		values: [{ id: "2", value: "2", parent: null }],
		providers: null,
	},
	// Фильтр "все включено" (AI - All Inclusive)
	ai: {
		type: 5,
		values: [
			{ id: "1", value: "1", parent: null }, // Полупансион
			{ id: "2", value: "2", parent: null }, // Полный пансион
		],
		providers: [],
	},
	// Фильтр элитных отелей для пакетных туров
	elite: {
		type: 3,
		values: [
			{ id: "49", value: "49", parent: null }, // Премиум концепция
			{ id: "1", value: "1", parent: null }, // Люкс концепция
		],
		providers: null,
	},
	// Фильтр семейных отелей
	family: {
		type: 3,
		values: [{ id: "5", value: "5", parent: null }],
		providers: null,
	},
	// Фильтр отелей 5 звезд
	"5stars": {
		type: 2,
		values: [{ id: "5", value: "5", parent: null }],
		providers: null,
	},
	// Фильтр отелей 4 звезды
	"4stars": {
		type: 2,
		values: [{ id: "4", value: "4", parent: null }],
		providers: null,
	},
	// Фильтр отелей 3 звезды
	"3stars": {
		type: 2,
		values: [{ id: "3", value: "3", parent: null }],
		providers: null,
	},
	// Фильтр расстояния до пляжа: до 50 метров
	"50m": {
		type: 25,
		values: [{ id: "0-50", value: "0-50", parent: null }],
		providers: null,
	},
	// Фильтр расстояния до пляжа: 50-250 метров
	"250m": {
		type: 25,
		values: [{ id: "50-250", value: "50-250", parent: null }],
		providers: null,
	},
};

// Параметры URL для пакетных туров
export const packageReservationParam = "&p=1&w=0&s=0";
