let operatingSystem = window.navigator.platform;
let navigatorName = window.navigator.appName;
let navigatorVersion = window.navigator.appVersion;
let navigatorUserAgent = window.navigator.userAgent;
let referringDomain = document.referrer;

let pageLoadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;

let timeParting = new Date().getHours(); // u otro método para separar por franja horaria
let maxPixelViewed = window.innerHeight; // más lógica si se quiere guardar el punto máximo
let totalVisibleArea = window.innerWidth * window.innerHeight;
let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
let scrollComplete = (scrollTop + window.innerHeight >= document.body.scrollHeight);
let PercentPageViewed = (scrollTop + window.innerHeight) / document.body.scrollHeight * 100;
let domain = window.location.hostname;
let conectionTipe = navigator.connection?.effectiveType || "unknown";
let returningVisitor = localStorage.getItem("visitedBefore") ? "yes" : "no";
localStorage.setItem("visitedBefore", "1");

// visitID / session ID
function getOrCreateSessionID() {
    const stored = JSON.parse(localStorage.getItem("session_info") || "{}");
    const now = Date.now();
    const timeout = 30 * 60 * 1000; // 30 min
  
    if (!stored.id || (now - stored.lastActivity) > timeout) {
      const newID = crypto.randomUUID(); // o cualquier otro generador
      localStorage.setItem("session_info", JSON.stringify({ id: newID, lastActivity: now }));
      return newID;
    }
  
    stored.lastActivity = now;
    localStorage.setItem("session_info", JSON.stringify(stored));
    return stored.id;
  }
  
  let sessionID = getOrCreateSessionID();

  // visitor ID

  function getOrCreateVisitorID() {
    let id = localStorage.getItem("visitor_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("visitor_id", id);
    }
    return id;
  }
  
  let visitorID = getOrCreateVisitorID();
  