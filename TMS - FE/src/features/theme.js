import {getCookie, setCookie} from "../cookies/cookieHandler.js"

export function toogleTheme(){
    if(getCookie("theme") === "") setCookie("theme", "light", 30)
    else if(getCookie("theme") === "dark") setCookie("theme", "light", 30)
    else if(getCookie("theme") === "light") setCookie("theme", "dark", 30)
    window.location.reload();
}