import {handleOnlyHotelClick} from "./onlyhotel/handleOnlyHotelClick";
import {hostReactAppReady} from "./utils";
import markup from './markup.html?raw'

function bootstrap() {
    document.body.insertAdjacentHTML('afterbegin', markup)
    // Делегирование на все ссылки с data-search-type
    document.addEventListener(
        "click",
        (e: MouseEvent) => {
            const el = e.target as Element | null;
            const link = el?.closest<HTMLAnchorElement>("a[data-search-type]");
            if (!link) return;

            e.preventDefault();
            const type = link.getAttribute("data-search-type");

            if (type === "onlyhotel") {
                handleOnlyHotelClick(link);
            }
            // else if (type === "package") handlePackageClick(link);
            // else if (type === "onlyflight") handleOnlyFlightClick(link);
        },
        true
    );
}

(async () => {
    await hostReactAppReady();
    bootstrap();
})();
