/**
 * CookieManager
 * 
 * Tagging Team 2025
 * 
 * version 1.0
 */
class CookieManager {

    // set cookie
    static setCookie(name, value, options = {}) {
        let contentCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        if (options.expires) {
            contentCookie += "; expires=" + options.expires.toUTCString();
        }

        if (options.path) {
            contentCookie += "; path=" + options.path;
        }

        if (options.domain) {
            contentCookie += "; domain=" + options.domain;
        }

        if (options.secure) {
            contentCookie += "; secure; HttpOnly";
        }

        document.cookie = contentCookie;
        
        // CookieManager.setCookie('name', 'Kodetop', {expires: new Date(2024, 6, 1)}, path=/, bbva.com.co);
    }

    // read cookie
    static getCookie(name) {
        let filter = /([.$?*|{}\(\)\[\]\\\/\+^])/g;
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + encodeURIComponent(name).replace(filter, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    // delete cookie
    static deleteCookie(name, options = {}) {
        let updatedOptions = {
            ...options,
            expires: new Date(0)
        };

        this.setCookie(name, "", updatedOptions);
    }

    //función de extracción de dominio de cookie
static cookieDomain() {
    var cookieDomainPeriods = "";
    var arrayHostLength = location.host.split(".").length;
         cookieDomainPeriods = "2";
      if (arrayHostLength > 3){
        cookieDomainPeriods = "3";
    }
    return cookieDomainPeriods;
}
}