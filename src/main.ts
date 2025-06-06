import {hostReactAppReady} from "./utils";
import {handleOnlyHotelClick} from "./onlyhotel/handleOnlyHotelClick";


(async () => {
    await hostReactAppReady()

    // @ts-ignore
    document.querySelector('.header-client-side-desktop').insertAdjacentHTML('afterbegin', `
    <a href="#"
   class="test-btn"
   data-onlyhotel-lookup-destination='SCYLAX FAMILY CLUB, DREAM FAMILY CLUB'
   >
   Погнали
</a>
`)

    document.querySelector('.test-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        const target: HTMLElement = (e.target as HTMLElement);
        handleOnlyHotelClick(target);
    })
})()
