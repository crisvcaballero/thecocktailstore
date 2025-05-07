


/**
 * @class Helpers
 * 
 * Tagging Team 2025
 * 
 * version 1.0
 */
class Helpers {

	static getBrowserName() {
		const userAgent = navigator.userAgent;
		let browserName;
	
		if (userAgent.indexOf("Firefox") > -1) {
			browserName = "Mozilla Firefox";
		} else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
			browserName = "Opera";
		} else if (userAgent.indexOf("Trident") > -1) {
			browserName = "Microsoft Internet Explorer";
		} else if (userAgent.indexOf("Edge") > -1) {
			browserName = "Microsoft Edge";
		} else if (userAgent.indexOf("Chrome") > -1) {
			browserName = "Google Chrome";
		} else if (userAgent.indexOf("Safari") > -1) {
			browserName = "Apple Safari";
		} else {
			browserName = "Unknown";
		}
	
		return browserName;
	}

	static getBrowserVersion() {
        const userAgent = navigator.userAgent;
        let browserVersion;

        if (userAgent.indexOf("Firefox") > -1) {
            browserVersion = userAgent.match(/Firefox\/([0-9]+(?:\.[0-9]+)*)/)[1];
        } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
            browserVersion = userAgent.match(/(Opera|OPR)\/([0-9]+(?:\.[0-9]+)*)/)[2];
        } else if (userAgent.indexOf("Trident") > -1) {
            browserVersion = userAgent.match(/rv:([0-9]+(?:\.[0-9]+)*)/)[1];
        } else if (userAgent.indexOf("Edge") > -1) {
            browserVersion = userAgent.match(/Edge\/([0-9]+(?:\.[0-9]+)*)/)[1];
        } else if (userAgent.indexOf("Chrome") > -1) {
            browserVersion = userAgent.match(/Chrome\/([0-9]+(?:\.[0-9]+)*)/)[1];
        } else if (userAgent.indexOf("Safari") > -1) {
            browserVersion = userAgent.match(/Version\/([0-9]+(?:\.[0-9]+)*)/)[1];
        } else {
            browserVersion = "Unknown";
        }

        return browserVersion;
    }

	static getBrowserPlatform() {
		return navigator.userAgentData.platform;
	}

	static isMobile(){
		if(navigator.userAgentData){

		}
		return navigator.userAgentData.mobile;
	}

	static getBrowserUserAgent(){
		return navigator.userAgent;
	}

	static getDeviceType(){
		const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return /android|avantgo|blackberry|bada\/|bb|meego|palm|phone|p(ixi|re)\/|plucker|symbian|webos|wos/i.test(userAgent);
	}

	static getDeviceModel() {//www.whatmyuseragent.com
        const userAgent = navigator.userAgent;
        let deviceModel = "Unknown";
        if (/Android/.test(userAgent)) {
            const match = userAgent.match(/Android\s+([\d.]+);.*;\s+([^\s;]+)/);
            if (match && match[2]) {
                deviceModel = match[2];
            }
        } else if (/iPhone|iPad|iPod/.test(userAgent)) {
            const match = userAgent.match(/(iPhone|iPad|iPod).*OS\s([\d_]+)/);
            if (match && match[1]) {
                deviceModel = match[1];
            }
        }else if(/SamsungBrowser/.test(userAgent) && /Android/.test(userAgent)){
			const match = userAgent.match(/SamsungBrowser\/([\d.]+);.*;\s+([^\s;]+)/);
			if (match && match[2]) {
				deviceModel = match[2];
			}

		}else if(/MiuiBrowser/.test(userAgent) && /Android/.test(userAgent)){
			const match = userAgent.match(/MiuiBrowser\/([\d.]+);.*;\s+([^\s;]+)/);
			if (match && match[1]) {
				deviceModel = match[1];
			}

		}

        return deviceModel;
    }

	static getBrowserLanguage() {
        return navigator.language || navigator.languages[0];
    }

	static getReferringDomain() {
        const referrer = document.referrer;
        if (referrer) {
            const url = new URL(referrer);
            return url.hostname;
        }
        return "No referrer domain";
    }


	static setLoadTime(){
		CookieManager.setCookie('b_pt', new Date(), { path: '/', domain: 'bbva.com.co', secure: true, sameSite: 'None'});
	}

	static setVisitTime(){
		CookieManager.setCookie('b_vt', new Date(), { path: '/', domain: 'bbva.com.co', secure: true, sameSite: 'None'});
	}

	static setSessionTime(){
		CookieManager.setCookie('b_st', new Date(), { path: '/', domain: 'bbva.com.co', secure: true, sameSite: 'None'});
	}

	static getLoadTime(){
		return CookieManager.getCookie('b_pt') - new Date();
	}

	static getGeolocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const latitud = position.coords.latitude;
					const longitud = position.coords.longitude;
					// Llamar a la función para obtener el país
                    Helpers.getCountryFromCoordinates(latitud, longitud);
				},
				(error) => {
					console.error('Error al obtener la geolocalización:', error);
				}
			);
		} else {
			console.error('La API de Geolocalización no es soportada por este navegador.');
		}
	}
	/**
	 *  con la latitud y longitud podemos determinar en qué país te encuentras utilizando un servicio de geocodificación inversa. Estos servicios toman las coordenadas geográficas (latitud y longitud) y devuelven información sobre la ubicación, como el país, la ciudad, etc.
	 *	Existen varias APIs que puedes utilizar para realizar geocodificación inversa, como la API de Google Maps, la API de OpenStreetMap (Nominatim), y muchas otras.
	 * 
	 * @param {*} lat 
	 * @param {*} lon 
	 */
	static getCountryFromCoordinates(lat, lon) {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const country = data.address.country;
                console.log('País:', country);
                // Aquí puedes realizar cualquier acción adicional con el país
                // Por ejemplo, puedes enviar estos datos a tu servidor
            })
            .catch(error => {
                console.error('Error al obtener el país:', error);
            });
    }
	/**
	 * utilizar un servicio como ipify para obtener la dirección IP del usuario.
	 * @returns ip
	 */
	static getIPAddress() {
        return fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const ip = data.ip;
                console.log('Dirección IP del usuario:', ip);
                return ip;
            })
            .catch(error => {
                console.error('Error al obtener la dirección IP:', error);
                return null;
            });
    }
	

	static getVisitTime(){
		return CookieManager.getCookie('b_vt') - new Date();
	}

	static getSessionTime(date){
		return CookieManager.getCookie('b_st') - date;
	}

	static getTimeParting(){
    	let date = new Date();
    	let n = date.getTimezoneOffset();
    	let timezone = n / -60;
    	let seconds = date.getSeconds();if (seconds < 10) seconds = '0' + seconds;
    	let minutes = date.getMinutes();if (minutes < 10) minutes = '0' + minutes;
    	let hours = date.getHours();if (hours < 10) hours = '0' + hours;
    	let day = date.getDate();if (day < 10) day = '0' + day;
    	let month = date.getMonth() + 1;if (month < 10) month = '0' + month;
    	let year = date.getFullYear();
    	let weekDay = date.getDay();
    	return year + "-" + month + "-" + day + "-" + hours + "-" + minutes + "-" + seconds + "-" + timezone + "-" + weekDay;
	}

	static getInfoScreen(){
		var info = {"width":screen.width, "height":screen.height, "availHeight":screen.availHeight, "availWidth":screen.availWidth}
		if (screen.width < 1024) 
			var result = "Pequeña";
		else if (screen.width < 1280) 
			var result = "Mediana";
		else 
			var result = "Grande"; 
		return window.devicePixelRatio;//cuántos píxeles físicos hay en el dispositivo por cada píxel lógico en la pantalla: pantalla estabdar es 1 y en pantalla Retina es 2 o más.
	}

	static getScrollX(){
		return window.scrollX;
	}

	static getScrollY(){
		return window.scrollY;
	}

	static getScrollComplete(){
		var result;
        window.addEventListener('scroll', function() {
            if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
                result = "true";
            }
        });
		return result;
    }
/**
	static getCampaign(){
    	let cid = new URL(window.location.href);
    		if(cid == undefined || cid == "" || cid == null){
        	return "";
    	}else{
        	return cid.searchParams.get('cid');
    	}
	}
 */

	static getTrackingCode(){
		var position1 = ''; //posicion 1
		var position2 = ''; //posicion 2
		var position3 = ''; //posicion 3
		var position4 = ''; //posicion 4
		var position5 = ''; //posicion 5
		var position6 = ''; //posicion 6
		var position7 = ''; //posicion 7
		var position8 = ''; //posicion 8
		var position9 = ''; //posicion 9
		var position10 = ''; //posicion 10
		var position11 = ''; //posicion 11
		var position12 = ''; //posicion 12
		var position13 = ''; //posicion 13
		var position14 = ''; //posicion 14
		var position15 = ''; //posicion 15
		var position16 = ''; //posicion 16
		var position17 = ''; //posicion 17
		var position18 = ''; //posicion 18
		var position19 = ''; //posicion 19

		const params = {};
        const queryString = window.location.search.substring(1);
        const regex = /([^&=]+)=([^&]*)/g;
        let match;
        while (match = regex.exec(queryString)) {
            params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
        }
		Object.entries(params).forEach(([key, value], i) => {
			if (key === 'cid') {
			  let parts = value.split(':');
			  parts.forEach((v, i) => {
				console.log(`Índice: ${i}, Valor: ${v}`);
			  });
			} else if (key === 'app') {
			  // lógica para app
			}
		  
			console.log(`Índice: ${i}, Valor: ${value}`);
		  });
        return params;
	}

	static getUrlParams() {
		const params = {};
		const queryString = window.location.search.substring(1);
		const regex = /([^&=]+)=([^&]*)/g;
		let match;
		while (match = regex.exec(queryString)) {
			params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
		}
		return params;
	}

	static getQueryParams() {
        const params = {};
        const url = new URL(window.location.href);
        url.searchParams.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    }

	static getNewRepeat(){
    	let visitor = CookieManager.getCookie("visitor");

    	if (visitor == "new") {
			let myDomain = location.host.replace("www.", "");
			let expiresDate = new Date();
        	CookieManager.setCookie('visitor', "repeat", {expires: expiresDate}, "path=/," + myDomain);
    	
		}else if (visitor == "repeat") {
        	let myDomain = location.host.replace("www.", "");
        	let expiresDate = new Date();
        	expiresDate.setFullYear(expiresDate.getFullYear() + 2);
        	CookieManager.setCookie('visitor', "repeat", {expires: expiresDate}, "path=/," + myDomain+ ", secure: true, sameSite: None");
    	
		}else if(visitor == undefined || visitor == "" || visitor == null){
        	let myDomain = location.host.replace("www.", "");
        	let expiresDate = new Date();
        	expiresDate.setFullYear(expiresDate.getFullYear() + 2);
        	CookieManager.setCookie('visitor', "new", {expires: expiresDate}, "path=/," + myDomain+ ", secure: true, sameSite: None");
    	}
		return visitor;
	}

	static getUniqueID(){
		visitorID = CookieManager.getCookie('AMCV_1B5181D7572B750E7F000101%40AdobeOrg');
    	if(visitorID){
        	let myDomain = location.host.replace("www.", "");
        	let expiresDate = new Date();
        	expiresDate.setFullYear(expiresDate.getFullYear() + 2);
        	CookieManager.setCookie('uniqueID', uniqueID, {expires: expiresDate}, "path=/," + myDomain + ", secure: true, sameSite: None");
			return visitorID;
    	}else{
			let uniqueID = CookieManager.getCookie("uniqueID");
    		if (uniqueID == null || uniqueID == "" || uniqueID == undefined) {
        		uniqueID = [...Array(20)].map(() => Math.random().toString(36)[2]).join('');
        		let myDomain = location.host.replace("www.", "");
        		let expiresDate = new Date();
        		expiresDate.setFullYear(expiresDate.getFullYear() + 2);
        		CookieManager.setCookie('uniqueID', uniqueID, {expires: expiresDate}, "path=/," + myDomain + ", secure: true, sameSite: None");
				return uniqueID;
    		}
    	}
	}
	
	static setPreviousValues(){
    	CookieManager.setCookie('b_prePageIntent', window.digitalData.page.pageInfo.pageIntent, {
        path: '/', // La cookie estará disponible en todo el sitio
        secure: true, // La cookie solo se enviará a través de HTTPS
        sameSite: 'None' // La cookie solo se enviará en solicitudes del mismo sitio
    	});
    	CookieManager.setCookie('b_prePageName', window.digitalData.page.pageInfo.pageName, {
        path: '/', // La cookie estará disponible en todo el sitio
        secure: true, // La cookie solo se enviará a través de HTTPS
        sameSite: 'None' // La cookie solo se enviará en solicitudes del mismo sitio
        });
    	CookieManager.setCookie('b_preLevel1', window.digitalData.page.pageInfo.level1, {
        path: '/', // La cookie estará disponible en todo el sitio
        secure: true, // La cookie solo se enviará a través de HTTPS
        sameSite: 'None' // La cookie solo se enviará en solicitudes del mismo sitio
    	});
    	CookieManager.setCookie('b_preUrl', document.referrer, {
        path: '/', // La cookie estará disponible en todo el sitio
        secure: true, // La cookie solo se enviará a través de HTTPS
        sameSite: 'None' // La cookie solo se enviará en solicitudes del mismo sitio
    	});
	}

	static getVisibleArea(){
		let totalVisibleArea = document.documentElement.scrollHeight * window.innerWidth;
		const observer = new IntersectionObserver((entries) => {
    		entries.forEach(entry => {
        		if (entry.isIntersecting) {
            		let visibleArea = entry.intersectionRect.width * entry.intersectionRect.height;
            		totalVisibleArea += visibleArea;
        		}
    		});
		}, { threshold: [0, 0.25, 0.5, 0.75, 1] });

		document.querySelectorAll('*').forEach(element => {
    		observer.observe(element);
		});
		return totalVisibleArea;
	}

	static getPercentPageViewed(){
    	const totalPageHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const percentViewed = ((scrollY + viewportHeight) / totalPageHeight) * 100;
        
		return percentViewed;
	}

	static serialize(string){
    	var inferior = 0	
		var superior = 999999
		var suma = 0
    	var sumaVocalesA = 1;
    	var sumaVocalesE = 1;
    	var sumaVocalesI = 1;
    	var sumaVocalesO = 1;
    	var whiteSpace = 1;
		for (var i = 0; i < string.length; i++) {
	  		suma += string.charCodeAt(i) * (i+1);
	  		var vectorLetras = string.toLowerCase().split("");
	  
	  		switch(vectorLetras[i]){
			case "a":
				sumaVocalesA++;
			break;
			case "e":
				sumaVocalesE++;
			break;
			case "i":  
				sumaVocalesI++;
			break;
			case "o":
				sumaVocalesO++;
			break;
			case " ":
				whiteSpace++;
			break;
       		}
		}
  
		var segundoFactor = (sumaVocalesA + sumaVocalesO) * (sumaVocalesE + sumaVocalesI)
		suma = suma.toString()+(segundoFactor * whiteSpace).toString()

		var num = parseFloat(suma) / Math.pow(10, suma.toString().length);		
		var aleat = num * superior - inferior
		var code = Math.round(parseInt(inferior) + aleat)
    
		return code	+ getCookieValue("sessionID");
	}

	static quitaTildes = function(text){
		text = text.replace(/á/gi,"a");
		text = text.replace(/é/gi,"e");
		text = text.replace(/í/gi,"i");
		text = text.replace(/ó/gi,"o");
		text = text.replace(/ú/gi,"u"); 
	  return text
	}

	static daymoment = function(hours) {
		if (hours >= 0 && hours < 6) {
			return "Late Night"
		} else if (hours >= 6 && hours < 12) {
			return "Morning";
		} else if (hours >= 12 && hours < 19) {
			return "Afternoon";
		} else {
			return "Evening";
		}
	}

	static weekNumber = function() {
		var now = new Date(),
			i = 0,
			f, weekNumber = (new Date(now.getFullYear(), 0, 1).getDay() > 0) ? 1 : 0;
		while ((f = new Date(now.getFullYear(), 0, ++i)) < now) {
			if (!f.getDay()) {
				weekNumber ++;
			}
		}
		return weekNumber;
	}

}
// CRIS - control sesiones por tiempo de inactividad
(function(){
	const TIMEOUT_MINUTES = 1; // Cambia este valor para el tiempo de expiración
  
	class InactivityCookie {
	  static generateId() {
		return 'id-' + Math.random().toString(36).substr(2, 9);
	  }
  
	  static set(name, value, timeoutMinutes = TIMEOUT_MINUTES) {
		const now = Date.now();
		const data = JSON.stringify({ value, timestamp: now });
		const expires = new Date(now + timeoutMinutes * 60 * 1000).toUTCString();
		const encoded = encodeURIComponent(data);
		document.cookie = `${name}=${encoded}; expires=${expires}; path=/`;
  
		console.log(`[Cookie ${name} SET] Raw: ${encoded}`);
		console.log(`[Cookie ${name} SET] Decoded:`, { value, timestamp: now, expires });
	  }
  
	  static get(name) {
		const cookie = document.cookie
		  .split("; ")
		  .find(c => c.startsWith(name + "="));
		if (!cookie) return null;
  
		try {
		  return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
		} catch {
		  return null;
		}
	  }
  
	  static isExpired(timestamp, timeoutMinutes = TIMEOUT_MINUTES) {
		const now = Date.now();
		return (now - timestamp) > timeoutMinutes * 60 * 1000;
	  }
  
	  static checkAndUpdate(name, timeoutMinutes = TIMEOUT_MINUTES) {
		const data = this.get(name);
		if (!data || this.isExpired(data.timestamp, timeoutMinutes)) {
		  const newId = this.generateId();
		  this.set(name, newId, timeoutMinutes);
		  console.log(`[Cookie ${name}] Nueva sesión iniciada (expirada o inexistente)\n`);
		  return newId;
		} else {
		  this.set(name, data.value, timeoutMinutes);
		  console.log(`[Cookie ${name}] Sesión renovada (interacción detectada)\n`);
		  return data.value;
		}
	  }
  
	  static delete(name) {
		document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
		console.log(`[Cookie ${name}] Eliminada manualmente`);
	  }
  
	  static bindActivityEvents(name, timeoutMinutes = TIMEOUT_MINUTES) {
		this.checkAndUpdate(name, timeoutMinutes);
  
		const handler = () => this.checkAndUpdate(name, timeoutMinutes);
  
		const events = [
		  "click", "scroll", "keydown",
		  "touchstart", "resize", "input", "change"
		];
  
		events.forEach(event =>
		  window.addEventListener(event, handler, { passive: true })
		);
  
		document.addEventListener("visibilitychange", () => {
		  if (!document.hidden) handler();
		});
	  }
	}
  
	// Activar lógica con TIMEOUT_MINUTES
	InactivityCookie.bindActivityEvents("sessionUser");
  
	// Verifica estado cada 5s
	setInterval(() => {
	  InactivityCookie.checkAndUpdate("sessionUser");
	}, 5000);
  })();
  