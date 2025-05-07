let deviceID = "";//modelo del dipositivo
let operatingSystem = "";//ok
//https://experienceleague.adobe.com/en/docs/analytics/components/dimensions/mobile-dimensions
let navigatorName = "";//ok
let navigatorVersion = "";//ok
let navigatorUserAgent = "";//ok
let referringDomain = "";//ok
let visitID = "";//30 mint de inactividad, 12 horas actividad continua o 2500 hits// dos desarrollos (en principoio cogemos el de adobe y dejamos algoritmo para despues)
let visitorID = ""; //dos años o 13 meses sin actividad //antiguo mcid (en principio cogemos el de adobe y desarrollamos algoritmo para crearlo nosotros)
//https://experienceleague.adobe.com/en/docs/analytics/components/metrics/visits 
let sessionID = "";//(30 minutos de inactividad, 12 horas de actividad continua o 2500 hits).
let bots = "";// (100 hits en menos de 100 segundos) -> En este caso, la visita finaliza cuando se cumple esto. // CRIS --> BACK
let timeSession = "";//lo procesa ADA
let timeVisit = "";//lo procesa ADA
let pageLoadTime = "";// ok temporizador carga de la página en milisegundos
let timeParting = "";//ok
let bounces = "";//????? procesamos en ADA?
//https://experienceleague.adobe.com/en/docs/analytics/components/metrics/bounce-rate
let hitOrderSession = "";//orden de hit en la sesión
let maxPixelViewed = "";//ok
let totalVisibleArea = "";//ok
let PercentPageViewed = "";//ok
let scrollTop = "";//ok
let scrollComplete = "";//ok
let error404 = "";//???? CRIS --> BACK
let ip = "";//puedo extraer, pero requiere usar un servicio de terceros
let geolocation = "";//puedo extraer, pero requiere usar un servicio de terceros y autorización del usuario
let conectionTipe = "";
let domain = "";
let returningVisitor = "";//ok
let scriptVersion = "2025_1.0";
//cid=dis:smc:amz:00001975-prueba_display_digital-cue-cuenta_vip_wellness:pr_theme-fide-tff:cr_03:pr_cta::::pr_ad_size:discov:pr_ad_subsource:audience_local:pr_all
let trackingCode_1_channel = "";//
let trackingCode_2_communicationFormat = "";//
let trackingCode_3_mediaPlatform = "";//
let trackingCode_4_comunication = "";//
let trackingCode_5_adGroup = "";//c
let trackingCode_6_creativeID = "";//
let trackingCode_7_cta = "";//
let trackingCode_8_keyword = "";//
let trackingCode_9_keywordType = "";//
let trackingCode_10_email = "";//
let trackingCode_11_adSize = "";//
let trackingCode_12_adUnit = "";//
let trackingCode_13_adSource = "";//
let trackingCode_14_audience = "";//
let trackingCode_15_alliance = "";//

let miTrackObject = {};
var viewEvents = "";
var clikEvents = "";



/**
 * Plugins 1.0
 */
Helpers.setLoadTime();
Helpers.setVisitTime();
Helpers.setSessionTime();

window.addEventListener('load', () => {
    pageLoadTime =  Helpers.getLoadTime();
});
window.addEventListener('beforeunload', (event) => {
    timeSession;
});

function calculateSessionTime() {
    timeSession = Helpers.getSessionTime(new Date());
    Helpers.setSessionTime();
}
setTimeout(calculateSessionTime, 30 * 60 * 1000);

scrollComplete = Helpers.getScrollComplete();

visitorID = Helpers.getUniqueID();

console.log('Hemos terminado de procesar los plugins');
/**
 * End Plugins 1.0
 */

//Funcion dummy CRIS serialización
function serialize(value) {
    try {
      if (typeof value === 'object') {
        return JSON.stringify(value);
      }
      return String(value);
    } catch (e) {
      return '';
    }
  }
//Inicialización _satellite para pruebas CRIS
  window._satellite = window._satellite || {
    getVar: function (key) {
      const varsSimuladas = {
        'CC.digitalData.application.application.type:digitalData.application.application.name': 'simulado-app-type:nombre-app',
        'otra.clave.especifica': 'valor-prueba'
      };
      return varsSimuladas[key] || '[valor_no_definido]';
    }
  };

  
//función de lanzamiento de huella
window.MiDigitalView = function(action, object) {
    console.log("SCRIPT ANALÍTICA: Lanzamiento de huella");
    console.log("🔵 Datos recibidos por MiDigitalView:");
    console.log("action:", action);
    console.log("digitalData:", JSON.stringify(object, null, 2));
        if(window.eventFired){
        //no permitir lanzar inicio de funnel
    }else{
        //permitir lanzar inicio de funnel
    }

    switch (action) {  
        case 'Page View':
            //isQualifiedVisits
            if(digitalData.products !== 'undefined' && digitalData.page.pageInfo.pageIntent == 'landing page' && digitalData.page.pageInfo.pageIntent == 'catalogo de producto' && digitalData.application.isQualifiedVisits == 'true'){
                viewEvents += ",event60,event39:" + serialize(digitalData.products.attributes[0].productName);
            }
        break;
        case 'App Page Visit':
            viewEvents = "event62,event41" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
            //isQualifiedVisits
            if(digitalData.products !== 'undefined' && digitalData.page.pageInfo.pageIntent == 'landing page' && digitalData.page.pageInfo.pageIntent == 'catalogo de producto' && digitalData.application.isQualifiedVisits == 'true'){
                viewEvents += ",event60,event39:" + serialize(digitalData.products.attributes[0].productName);
            }
            window.eventFired = true
        break;
        case 'App Step OTP':
            viewEvents += ",event288,event267" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;
        case 'App Step 2':
            viewEvents += ",event64,event43" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
            window.eventFired = true
        break;
        case 'App Step 3':
            viewEvents += ",event65,event44" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;   
        case 'App Step 4':
            viewEvents += ",event66,event45" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;   
        case 'App Step 5': 
            viewEvents += ",event67,event46" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;   
        case 'App Step 6':
            viewEvents += ",event68,event47" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;       
        case 'App Step 7':
            viewEvents += ",event69,event48" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;        
        case 'App Step 8':
            viewEvents += ",event70,event49" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;        
        case 'App Step 9':
            viewEvents += ",event71,event50" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;        
        case 'App Step 10':
            viewEvents += ",event72,event51" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;    
        case 'App Step 11':
            viewEvents += ",event73,event52" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;    
        case 'App Step 12':
            viewEvents += ",event74,event53" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;   
        case 'App Step 13':
            viewEvents += ",event75,event54" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;   
        case 'App Step 14':
            viewEvents += ",event276,event255" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;   
        case 'App Step 15':
            viewEvents += ",event277,event256" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;   
        case 'App Step 16':
            viewEvents += ",event278,event257" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;   
        case 'App Step 17':
            viewEvents += ",event279,event258" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;   
        case 'App Step 18':
            viewEvents += ",event280,event259" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;   
        case 'App Step 19':
            viewEvents += ",event281,event260" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;   
        case 'App Step 20':
            viewEvents += ",event282,event261" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;   
        case 'App Step 21':
            viewEvents += ",event283,event262" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;   
        case 'App Step 22':
            viewEvents += ",event284,event263" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;   
        case 'App Step 23':
            viewEvents += ",event285,event264" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;   
        case 'App Step 24':
            events = "event286,event265" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;   
        case 'App Step 25':
            viewEvents += ",event287,event266" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
        break;   
        case 'App Completed':
            if(digitalData.application.state == 'finalizado'){
                viewEvents += ",event76,event55" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
              }
            if(digitalData.application.state == 'aprobado'){
                viewEvents += ",event76,event55" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
            }
            if(digitalData.application.state == 'rechazado'){
                viewEvents += ",event76,event55" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
            }
            if(digitalData.application.state == 'contratado'){
                viewEvents += ",event76,event55" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
            }
            if(digitalData.application.state == 'en revision'){
                viewEvents += ",event76,event55" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
            }
            if(digitalData.application.state == 'cancelado'){
                viewEvents += ",event76,event55" + ':' + serialize(_satellite.getVar('CC.digitalData.application.application.type:digitalData.application.application.name'));
            }
        break;        
        default:
            console.log("Evento de analítica no incluido en la taxonomía");
    }  

    // error page
    if(typeof digitalData.page.pageInfo.errorPage !== "undefined" && digitalData.page.pageInfo.errorPage !== ""){
        if(typeof viewEvents === "undefined"){
            viewEvents += ",event32";
        }
    }

    // internal campaign
    if(digitalData.internalCampaign.attributes != "" && digitalData.internalCampaign.event.eventInfo.eventName != 'IntCmpClick'){
        if (viewEvents != "undefined"){
            viewEvents += ",event34,event35";
        }
    }

    // optimization
    if(digitalData.optimization.event.eventName == 'optimizationOnClick'){
        if (viewEvents != "undefined"){
            viewEvents += ",event20";
        }
    }

    //product
    if(digitalData.products && Array.isArray(digitalData.products.attributes) && digitalData.products.attributes.length > 0){
      if (digitalData.products.attributes[0].amount != "" && action == "App Completed") {
        if (viewEvents != "undefined"){
            viewEvents += ",event91";
        }
      }
      if (digitalData.products.attributes[0].paymentAmount != "" && action == "App Completed") {
        if (viewEvents != "undefined"){
            viewEvents += ",event92";
        }
      }
      if (digitalData.products.attributes[0].quantity != "" && action == "App Completed") {
        if (viewEvents != "undefined"){
            viewEvents += ",event93";
        }
      }
    }


    var miTrackObject = {"action":action, "type":"sendView", "events":viewEvents, "digitalData":object};
    // contrucción de llamada a AWS
    if (miTrackObject.type != "stop"){
        var aux = {
            action:miTrackObject.action, 
            type:miTrackObject.type, 
            events:miTrackObject.events,
            digitalData:miTrackObject.digitalData,
            uniqueID: visitorID,
            timeParting: Helpers.getTimeParting(),
            returningVisitor: Helpers.getNewRepeat(),
            trackingCode: Helpers.getTrackingCode(),
            loadTime: Helpers.getLoadTime(),
            navigatorName: Helpers.getBrowserName(),
            navigatorVersion: Helpers.getBrowserVersion(),
            navigatorPlatform: Helpers.getBrowserPlatform(),
            navigatorUserAgent: Helpers.getBrowserUserAgent(),
            navigatorLanguage: Helpers.getBrowserLanguage(),
            referringDomain: Helpers.getReferringDomain(),
            url: window.location.href

        };
        // Imprimir el objeto en formato legible
        console.log(miTrackObject.action +" -> \nEnviando evento: " + JSON.stringify(aux, null, 2));
       
    }
    miTrackObject = {};
    viewEvents = "";
}
    
//función de lanzamiento de clic
window.MiDigitalLink = function(action, object) {
    console.log("SCRIPT ANALÍTICA: Lanzamiento de clic");
    console.log("🔵 Datos recibidos por MiDigitalLink:");
    console.log("action:", action);
    console.log("digitalData:", JSON.stringify(object, null, 2));
    switch (action) {
        case 'External Link':
            clikEvents += ",event6";
        case 'Download Link':
            clikEvents += ",event6";
        case 'Interaction Link':
            clikEvents += ",event6";
        case 'Internal Link':
            clikEvents += ",event6";
        break;
        case 'Click Chat':
            clikEvents += ",event7";
        break;
        case 'Logout':
            clikEvents += ",event8";
        break;
        case 'Internal Search':
            if('digitalData.page.pageActivity.search.onSiteSearchResults' != '0' && 'digitalData.page.pageActivity.search.onSiteSearchResults' != ""){
                clikEvents += ",event9,event11"
            }
            if('digitalData.page.pageActivity.search.onSiteSearchResults' == '0'){
                clikEvents += ",event10,event11"
            }
        break;
        case 'Login':
            clikEvents += ",event12";
        break;
        case 'Scroll Complete':
            clikEvents += ",event14";
        break;
        case 'Unsuccessful Login':
            clikEvents += ",event24";
        break;
        case 'Site Error':
            clikEvents += ",event33";
        break;
        case 'Click Through':
            clikEvents += ",event36";
        break;
        case 'Click Close':
            clikEvents += ",event37";
        break;
        case 'Audio Player Start':
            clikEvents += ",event171";
        break;
        case 'Audio Player 25':
            clikEvents += ",event173";
        break;
        case 'Audio Player 50':
            clikEvents += ",event174";
        break;
        case 'Audio Player 75':
            clikEvents += ",event175";
        break;
        case 'Audio Player End':
            clikEvents += ",event176";
        break;
        case 'Audio Player Open':
            clikEvents += ",event177";
        break;
        case 'Video Player Start':
            clikEvents += ",event155";
        break;
        case 'Video Player 25':
            clikEvents += ",event156";
        break;
        case 'Video Player 50':
            clikEvents += ",event157";
        break;
        case 'Video Player 75':
            clikEvents += ",event158";
        break;
        case 'Video Player End':
            clikEvents += ",event159";
        break;
        case 'App On Click Start': 
            clikEvents += ",event61,event40";
        break;  
        case 'App Started':
          if (window.eventFired == true){   
                type = "action";
                clikEvents += ",event63,event42";
                window.eventFired == false
          }else{
                type = "stop";
                clikEvents += ",event63,event42";
          }
          break; 
        default:
            console.log("Evento de analítica no incluido en la taxonomía");
    }

    var miTrackObject = {"action":action, "type":"sendLink", "events":clikEvents, "digitalData":object};
    if (miTrackObject.type != "stop"){
        //ejecución de la llamada a AWS
        var aux = {
            action:miTrackObject.action, 
            type:miTrackObject.type, 
            events:miTrackObject.events,
            digitalData:miTrackObject.digitalData,
            uniqueID: visitorID,
            timeParting: Helpers.getTimeParting(),
            returningVisitor: Helpers.getNewRepeat(),
            trackingCode: Helpers.getTrackingCode(),
            loadTime: Helpers.getLoadTime(),
            navigatorName: Helpers.getBrowserName(),
            navigatorVersion: Helpers.getBrowserVersion(),
            navigatorPlatform: Helpers.getBrowserPlatform(),
            navigatorUserAgent: Helpers.getBrowserUserAgent(),
            navigatorLanguage: Helpers.getBrowserLanguage(),
            referringDomain: Helpers.getReferringDomain(),
            url: window.location.href
        };
        console.log(miTrackObject.action +" -> \nEnviando evento: " + JSON.stringify(aux, null, 2));
       
    }
    clikEvents = "";
    miTrackObject = {};

}


function huella() {
   // alert('Se ha dado clic al botón!');
   digitalData.page.pageInfo.pageName = "escritorio:publica:personas:home";
    MiDigitalView('Page View', digitalData);
}

function huellaConErrorPage() {
   // alert('Se ha dado clic al botón!');
   digitalData.page.pageInfo.pageName = "escritorio:publica:personas:home:404";
    digitalData.page.pageInfo.errorPage = "404";
    MiDigitalView('Page View', digitalData);
}

function huellaConInternalCampaign() {
    digitalData.page.pageInfo.pageName = "escritorio:publica:personas:mis productos";
    digitalData.internalCampaign = {
        "attributes":[{
            "location":"test",
            "campaignFormat":"test",
            "collectiveCode":"test",
            "campaignName":"test",
            "product":"test",
            "productCode":"test",
            "quantity":"test",
        }],
        "event":{
            "eventInfo":{
                "eventName":"mi campaña interna",
                "siteActionName":"action"
            }
        }
    }
    MiDigitalView('Page View', digitalData);
}

function huellaConOptimization() {
    digitalData.page.pageInfo.pageName = "escritorio:publica:personas:home";
    digitalData.optimization = {
        "attributes":[{
            "idOptimizacion":"test",
            "experience":"test",
            "place":"test",
            "collection":"test",
            "collectionID":"test",
            "collectionPosition":"test",
            "collectionStatus":"test",
            "collectionStatusTimeChange":"test",
            "item":"test",
            "itemID":"test",
            "itemPosition":"test",
            "itemCategory":"test",
            "itemStatus":"test",
            "itemStatusTimeChange":"test",
            "contractID":"test",
            "type":"test",
            "executor":"test",
            "audience":"test"
    }],
    event: {
        eventName: "optimizationOnClick",
        optimizationEvent: ""
    }
};
    MiDigitalView('Page View', digitalData);
}

function appOnClickStart() {
    digitalData.page.pageInfo.pageName = "escritorio:publica:personas:home:tarjetas";
    digitalData.products = {
        "attributes":[{
            "primaryCategory": "test",
            "productSubtype": "test",
            "productName": "test",
            "productCode": "test",
            "contractID": "",
            "quantity": "",
            "amount": "",
            "paymentAmount": "",
            "numberOfPayments": "",
            "paymentDate": "",
            "paymentType": "",
            "serviceCharge": "",
            "currency": "",
            "numberOfHolders": "",
            "term": "",
            "group": "",
            "state": "",
            "interestRate": {
                "tin": "",
                "tae": "",
                "rate": "",
            },
        }],
    }
    MiDigitalLink('App On Click Start', digitalData);
    MiDigitalLink('App Started', digitalData);
    MiDigitalView('App Page Visit', digitalData);
}

function appStep3() {
    digitalData.page.pageInfo.pageName = "escritorio:publica:personas:home:tarjetas:paso3";
    digitalData.products = {
        "attributes":[{
            "primaryCategory": "test",
            "productSubtype": "test",
            "productName": "test",
            "productCode": "test",
            "contractID": "",
            "quantity": "",
            "amount": "",
            "paymentAmount": "",
            "numberOfPayments": "",
            "paymentDate": "",
            "paymentType": "",
            "serviceCharge": "",
            "currency": "",
            "numberOfHolders": "",
            "term": "",
            "group": "",
            "state": "",
            "interestRate": {
                "tin": "",
                "tae": "",
                "rate": "",
            },
        }],
    }
    MiDigitalView('App Step 3', digitalData);
}

function appCompleted() {
    digitalData.page.pageInfo.pageName = "escritorio:publica:personas:home:tarjetas:pagina exitosa";
    digitalData.application.state = "aprobado";
    digitalData.products = {
        "attributes":[{
            "primaryCategory": "test",
            "productSubtype": "test",
            "productName": "test",
            "productCode": "test",
            "contractID": "",
            "quantity": "",
            "amount": "",
            "paymentAmount": "",
            "numberOfPayments": "",
            "paymentDate": "",
            "paymentType": "",
            "serviceCharge": "",
            "currency": "",
            "numberOfHolders": "",
            "term": "",
            "group": "",
            "state": "",
            "interestRate": {
                "tin": "",
                "tae": "",
                "rate": "",
            },
        }],
    }
    MiDigitalView('App Completed', digitalData);

}


function login() {
    digitalData.user.userState = "logado";
    digitalData.user.e = "77ce6c6c8c9ae5295a800c0b4ba019a8a75ff54a58507559bd4d52a5c3ecfcd6"
    digitalData.user.p = "99775dad8a90f236e1bdca9fe67df3d140d4260a3069b6b77ecc553ab8cea603"
    MiDigitalLink('Login', digitalData);
}

function datalayer() {
    console.log(JSON.stringify(digitalData, null, 2));

}


// DETECTOR DE BOTS - CRIS
(function waitForMiDigitalFunctions() {
    if (typeof window.MiDigitalView !== 'function' || typeof window.MiDigitalLink !== 'function') {
      // Esperamos hasta que ambas funciones estén definidas
      setTimeout(waitForMiDigitalFunctions, 10);
      return;
    }
  
    //  BLOQUE PRINCIPAL DEL DETECTOR DE BOTS
    (function () {
        //inicializamos variables
      var hitTimestamps = [];
      var BOT_HIT_THRESHOLD = 100; //limites que se podrían ajustar - numero de hits
      var TIME_WINDOW_MS = 100; //limites que se podrían ajustar - ventana temporal en ms
      var IS_BOT = false; // Flag para marcar si ya se detectó al bot
      var botEventSent = false; // Flag para asegurarse de que solo se envíe un evento "is_bot"
      var hitCounter = 0; // Contador total de hits
    
      // Objeto auxiliar para guardar datos del bot para enviar con "is_bot"
      var botMeta = {
        totalHits: 0,
        firstHitTime: null,
        lastHitTime: null,
        samplePageNames: []
      };
      // Guardamos las funciones originales para poder usarlas si el tráfico no es de bot
      const originalView = window.MiDigitalView; //intercepto los objetos originales
      const originalLink = window.MiDigitalLink;
  

    /*
     * Función que envuelve a MiDigitalView o MiDigitalLink
     * Evalúa si se trata de tráfico bot y actúa en consecuencia
     */
      function detectBot(fn, action, object) {
        if (IS_BOT) {
          console.log(`[BOT DETECTADO] Bloqueado: ${action}`);
          return false;
        }
  
        var now = Date.now();
        hitCounter++; // Incrementamos el contador total

        // Guardamos el tiempo del primer hit (para trazabilidad)
        if (hitCounter === 1) {
          botMeta.firstHitTime = now;
        }
        // Guardamos el tiempo del último hit y total acumulado
        botMeta.lastHitTime = now;
        botMeta.totalHits = hitCounter;
  
        if (object?.page?.pageInfo?.pageName && botMeta.samplePageNames.length < 5) {
          botMeta.samplePageNames.push(object.page.pageInfo.pageName);
        }
        
        hitTimestamps = hitTimestamps.filter(ts => now - ts <= TIME_WINDOW_MS); // Limpiamos timestamps que estén fuera de la ventana de tiempo
        hitTimestamps.push(now); // Añadimos el timestamp actual
  
        // Evaluación: si se superó el umbral de hits en el tiempo establecido
        if (hitTimestamps.length >= BOT_HIT_THRESHOLD) {
          IS_BOT = true;
          console.warn('[BOT DETECTADO] Se ha superado el umbral de hits');
  
        // Solo lanzamos el evento is_bot una vez
          if (!botEventSent) {
            botEventSent = true;
  
            try {
                // Llamamos a la función original MiDigitalView para enviar el evento "is_bot"
              originalView("is_bot", {
                page: {
                  pageInfo: {
                    pageName: "bot:detection"
                  }
                },
                botMeta: botMeta,
                timestamp: now,
                userAgent: navigator.userAgent,
                source: 'bot_protection_script'
              });
            } catch (e) {
              console.error('Error enviando is_bot:', e);
            }
          }
        // Muy importante: detenemos el hit actual
          return false;
        }
        // Si no se ha detectado como bot, ejecutamos la función original
        return fn(action, object);
      }
    // Reemplazamos MiDigitalView con la versión protegida
      window.MiDigitalView = function (action, object) {
        return detectBot(originalView, action, object);
      };
      
    // Reemplazamos MiDigitalLink con la versión protegida
      window.MiDigitalLink = function (action, object) {
        return detectBot(originalLink, action, object);
      };
  
      console.log('[Bot Detector] Protegiendo MiDigitalView y MiDigitalLink');
    })();
  })();
//FIN DE SCRIPT BOT  


