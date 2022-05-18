import store from "../../Redux/store";
// import {  loadStateLang} from '../../AppStart'
import { SetLang, SetRtl } from "../../slice";
import "../../locales/i18n";
import { SetMenuOpen } from "./designSystem/MiddlewareSlice";
// import i18next from 'i18next';

// i18next.changeLanguage(loadStateLang());

/*
 * REDUX SECTION
 */
window.store = store;
//Counter Component Example to dispatch from angularjs
// const CounterReducers = {
//     increment,decrement
// }
// window.CounterReducers = CounterReducers

//////////////////////////

window.SetMenuOpen = SetMenuOpen;

window.addEventListener("storage", () => {
  store.dispatch(SetLang());
  store.dispatch(SetRtl());
  // i18next.changeLanguage(loadStateLangAng());
  // document.body.dir = isRtl();
});
