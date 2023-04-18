const BASE_URL = "http://localhost:3000";
const CACHE_NAME = "events-cache";
const EVENT_ENDPOINT_PATH = "/events";
const EVENT_ENDPOINT_REGEX = new RegExp(`${BASE_URL}${EVENT_ENDPOINT_PATH}`);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.add(`${BASE_URL}${EVENT_ENDPOINT_PATH}`))
  );
});

self.addEventListener("fetch", (event) => {
  if (EVENT_ENDPOINT_REGEX.test(event.request.url)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          console.log("Serving response from cache");
          return response;
        }
        return fetch(event.request).then((response) => {
          console.log("Fetching response from network");
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, response.clone()));
          return response;
        });
      })
    );

    event.waitUntil(
      new Promise((resolve) => setTimeout(resolve, 25000)).then(() =>
        caches
          .open(CACHE_NAME)
          .then((cache) => cache.add(`${BASE_URL}${EVENT_ENDPOINT_PATH}`))
      )
    );
  }
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker Activated");
});

// Helper function to render a single event item
function renderEvent(event) {
  console.log(event);
  const li = document.createElement("li");
  li.innerHTML = `<strong>${event.title}</strong> (${event.description})`;
  return li;
}

// Retrieve the cached event data and render it to the page
async function renderCachedEvents() {
  const cache = await caches.open(CACHE_NAME);
  const cachedRequests = await cache.keys();
  const cachedResponses = await Promise.all(
    cachedRequests.map((req) => cache.match(req))
  );
  const cachedEventData = await Promise.all(
    cachedResponses
      .filter(
        (res) =>
          res &&
          res.ok &&
          EVENT_ENDPOINT_REGEX.test(res.url) &&
          res.headers.get("content-type").indexOf("application/json") !== -1
      )
      .map((res) => res.json())
  );
  console.log(cachedResponses);
  const eventList = document.getElementById("event-list");
  eventList.innerHTML = "";
  cachedEventData.forEach((events) => {
    events.forEach((event) => {
      eventList.appendChild(renderEvent(event));
    });
  });
}

// Initial render of cached events
renderCachedEvents();
