import {hostReactAppReady} from "./utils";
import {handleOnlyHotelClick} from "./onlyhotel/handleOnlyHotelClick";
import {DOM_SELECTORS, ONLYHOTEL_HTML_ATTRIBUTES, PACKAGE_HTML_ATTRIBUTES} from "./constants";

/**
 * Конфигурация тестовой кнопки
 */
interface TestButtonConfig {
    text: string;
    destination: string;
    filter?: string;
    className?: string;
    type?: "onlyhotel" | "package";
}

/**
 * Создает HTML строку для контейнера тестовых кнопок
 */
function createTestButtonsHTML(buttons: TestButtonConfig[]): string {
    const buttonsHTML = buttons
        .map((button) => {
            const isOnlyHotel = button.type === "onlyhotel" || !button.type;
            const attributes = isOnlyHotel
                ? ONLYHOTEL_HTML_ATTRIBUTES
                : PACKAGE_HTML_ATTRIBUTES;

            return `
        <a href="#"
           class="test-btn ${button.className || ""}"
           ${attributes.DESTINATION}="${button.destination}"
           ${button.filter ? `${attributes.FILTER}="${button.filter}"` : ""}
           data-button-type="${button.type || "onlyhotel"}"
           >
           ${button.text}
        </a>`;
        })
        .join("");

    return `
    <div class="${DOM_SELECTORS.TEST_BUTTONS_CONTAINER.slice(1)}" style="display: flex; gap: 10px; margin: 10px; padding: 10px; background-color: #f8f9fa; border-radius: 4px;">
        ${buttonsHTML}
    </div>`;
}

/**
 * Инициализирует тестовые кнопки и обработчики событий
 */
async function initializeDynamicLinksApp(): Promise<void> {
    try {
        // Ждем готовности React приложения
        await hostReactAppReady();

        // Конфигурация тестовых кнопок
        const testButtons: TestButtonConfig[] = [
            {
                text: "5★ Отели",
                destination: "Турция",
                filter: "",
                type: "onlyhotel",
            },
            {
                text: "Пакетные туры в Турцию",
                destination: "Турция",
                filter: "available",
                type: "package",
            },
        ];

        // Вставляем тестовые кнопки в header
        const headerElement = document.querySelector(
            DOM_SELECTORS.HEADER_CONTAINER,
        );
        if (headerElement) {
            headerElement.insertAdjacentHTML(
                "afterbegin",
                createTestButtonsHTML(testButtons),
            );
        }

        // Добавляем обработчики событий к тестовым кнопкам
        const testButtonElements = document.querySelectorAll(
            DOM_SELECTORS.TEST_BUTTON,
        );
        testButtonElements.forEach((button) => {
            button.addEventListener("click", handleButtonClick);
        });
    } catch (error) {
        // Тихо обрабатываем ошибку инициализации
    }
}

/**
 * Обрабатывает события клика по тестовым кнопкам
 */
function handleButtonClick(event: Event): void {
    event.preventDefault();

    const target = event.currentTarget;
    if (!(target instanceof HTMLAnchorElement)) {
        return;
    }

    const buttonType = target.getAttribute("data-button-type") || "onlyhotel";

    if (buttonType === "package") {
        console.log('package')
    } else {
        handleOnlyHotelClick(target);
    }
}

// Инициализируем приложение
initializeDynamicLinksApp();
