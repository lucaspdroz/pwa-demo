document.addEventListener("DOMContentLoaded", () => {
  const cacheName = "events-cache";
  const url = "http://localhost:3000/events";
  const list = document.querySelector("#event-list");

  caches.has(cacheName).then((cacheExists) => {
    if (cacheExists) {
      console.log("Cache exists!");
      caches.open(cacheName).then((cache) => {
        cache.match(url).then((response) => {
          if (response) {
            response.json().then((json) => {
              const list = document.getElementById("event-list");
              list.innerHTML = "";
              json.forEach((event) => {
                for (const key in event) {
                  const listItem = document.createElement("li");
                  const listText = document.createTextNode(
                    `${key}: ${event[key]}`
                  );
                  listItem.appendChild(listText);
                  list.appendChild(listItem);
                }
                const separator = document.createElement("hr");
                list.appendChild(separator);
              });
            });
          }
        });
      });
    } else {
      console.log("Cache does not exist.");
    }
  });
});
