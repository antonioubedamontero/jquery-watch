const MAX_CLOCKS = 5;
let clocks = [];
let localTimeAndDate;

$("document").ready(start);

function start() {
  // load cities
  let cities = data_cities;
  loadCities(cities);

  // Render local time every second
  setInterval(() => {
    localTimeAndDate = new Date();
    $("#localTime").val(localTimeAndDate.toLocaleTimeString());
  }, 1000);

  // Add listener to select change for add or remove clock
  $("#sel-cities").change(function () {
    const selectedCity = $(this).find("option:selected");
    const clock = {
      city: selectedCity.text(),
      zone: selectedCity.val(),
    };
    addClock(clock);
  });
}

function loadCities(cities) {
  for (let city of cities) {
    $("#sel-cities").append(
      `<option value="${city.zone}">${city.city}</option>`
    );
  }
}

function addClock(clock) {
  const foundClock = clocks.find((clockItem) => clockItem.city === clock.city);

  if (foundClock) {
    return alert(`El reloj ${clock.city} ya existe`);
  }

  if (!foundClock && clocks.length === MAX_CLOCKS) {
    return alert("Número máximo de relojes alcanzado");
  }

  clocks.push(clock);
  addClockToHTML(clock);
}

function addClockToHTML(clock) {
  const card = `
    <div class="card col-12 col-sm-5">
        <div class="card-header">
            <div class="container">
              <div class="row justify-content-between align-items-center">
                <strong class="col-8">${clock.city}</strong>
                <button class="col-2 btn btn-outline-danger close-btn" type="button">X</button>
              </div>
            </div>
        </div>
        <div class="card-body">
        </div>
    </div>
  `;
  const cardElement = $(card);

  // Add listener to close button in clock card
  $("#clocks").append(cardElement);
  cardElement.find(".close-btn").click(function () {
    cardElement.remove();
    clocks = clocks.filter((clockItem) => clockItem.city !== clock.city);
  });

  // Render external clock every second
  setInterval(() => {
    let externalFormat = Intl.DateTimeFormat("es-ES", {
      timeZone: clock.zone,
      timeStyle: "medium",
    });
    let externalDate = externalFormat.format(localTimeAndDate);
    cardElement.find(".card-body").html(externalDate);
  }, 1000);
}
