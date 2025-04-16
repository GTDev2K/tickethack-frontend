console.log("ok");

document.querySelector("#search-button").addEventListener("click", function () {
  const departure = document.querySelector("#search-departure").value;
  const arrival = document.querySelector("#search-arrival").value;
  const date = document.querySelector("#date").value;

  fetch("http://localhost:3000/trips/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ departure, arrival, date }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        document.querySelector("#default-display").remove();
        for (let i = 0; i < data.trips.length; i++) {
          document.querySelector("#right-section").innerHTML += `
		<div class="travel">
				<p class="departure-city">${data.trips[i].departure}</p>
				<span>></span>
				<p class="arrival-city">${data.trips[i].arrival}</p>
                <p class="time">${new Date(data.trips[i].date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</p>
                <p class="price">${data.trips[i].price} €</p>
				<input type="button" value="Book" class="input" class="book-button"/>
				</div>`;
        }
      }
    });
});
