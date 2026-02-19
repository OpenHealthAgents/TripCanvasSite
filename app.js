const state = {
  destination: "Barcelona, Spain",
  dates: "Apr 12 - Apr 15, 2026",
  estimatedCost: 1780,
  summary: "3-day city culture plan with walkable neighborhoods, curated tapas stops, and oceanfront sunset time.",
  itinerary: [
    {
      day: "Day 1",
      time: "10:00",
      name: "Gothic Quarter Walking Tour",
      description: "Introductory walk through old city lanes and Roman walls.",
      address: "Placa Nova, Barcelona",
      hours: "10:00 AM - 12:00 PM",
      pin: [76, 160]
    },
    {
      day: "Day 1",
      time: "14:00",
      name: "Picasso Museum",
      description: "Reserve timed entry for the core permanent collection.",
      address: "Carrer de Montcada, Barcelona",
      hours: "10:00 AM - 7:00 PM",
      pin: [138, 146]
    },
    {
      day: "Day 2",
      time: "11:00",
      name: "Sagrada Familia",
      description: "Guided architecture visit with tower access.",
      address: "Carrer de Mallorca, Barcelona",
      hours: "9:00 AM - 8:00 PM",
      pin: [220, 116]
    },
    {
      day: "Day 2",
      time: "19:30",
      name: "Tapas Crawl in El Born",
      description: "Small-group evening route across four local favorites.",
      address: "El Born, Barcelona",
      hours: "6:00 PM - 11:00 PM",
      pin: [290, 128]
    },
    {
      day: "Day 3",
      time: "17:30",
      name: "Barceloneta Sunset",
      description: "Beach walk and waterfront dinner reservation.",
      address: "Passeig Maritim, Barcelona",
      hours: "Open all day",
      pin: [330, 92]
    }
  ],
  hotels: [
    {
      name: "Harbor Light Hotel",
      rating: 4.6,
      price: 198,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80",
      bookingUrl: "https://www.expedia.com/",
      area: "La Barceloneta"
    },
    {
      name: "Casa Rambla Boutique",
      rating: 4.4,
      price: 164,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=700&q=80",
      bookingUrl: "https://www.booking.com/",
      area: "Las Ramblas"
    },
    {
      name: "Eixample Urban Stay",
      rating: 4.3,
      price: 149,
      image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=700&q=80",
      bookingUrl: "https://www.expedia.com/",
      area: "Eixample"
    }
  ]
};

const tabs = Array.from(document.querySelectorAll(".tab"));
const panels = {
  overview: document.getElementById("mode-overview"),
  itinerary: document.getElementById("mode-itinerary"),
  hotels: document.getElementById("mode-hotels")
};

const timelineEl = document.getElementById("timeline");
const mapPinsEl = document.getElementById("map-pins");
const mapLegendEl = document.getElementById("map-legend");
const hotelsEl = document.getElementById("hotel-carousel");
const destinationEl = document.getElementById("destination");
const tripDatesEl = document.getElementById("trip-dates");
const tripCostEl = document.getElementById("trip-cost");
const tripSummaryEl = document.getElementById("trip-summary");
const modal = document.getElementById("activity-modal");
const modalTitle = document.getElementById("modal-title");
const modalDetails = document.getElementById("modal-details");

function setMode(mode) {
  tabs.forEach((tab) => {
    const active = tab.dataset.mode === mode;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });

  Object.entries(panels).forEach(([key, panel]) => {
    panel.classList.toggle("active", key === mode);
  });
}

function renderOverview() {
  destinationEl.textContent = state.destination;
  tripDatesEl.textContent = state.dates;
  tripCostEl.textContent = `$${state.estimatedCost.toLocaleString()}`;
  tripSummaryEl.textContent = state.summary;
}

function renderItinerary() {
  timelineEl.innerHTML = "";
  mapPinsEl.innerHTML = "";
  mapLegendEl.innerHTML = "";

  state.itinerary.forEach((item, index) => {
    const activity = document.createElement("article");
    activity.className = "activity";
    activity.innerHTML = `
      <div class="activity-day">${item.day}</div>
      <span class="activity-time">${item.time}</span>
      <h4>${item.name}</h4>
      <p>${item.description}</p>
    `;

    activity.addEventListener("click", () => {
      modalTitle.textContent = item.name;
      modalDetails.textContent = `${item.address} | ${item.hours}`;
      modal.showModal();
    });

    timelineEl.appendChild(activity);

    const pin = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    pin.setAttribute("class", "pin");
    pin.setAttribute("cx", String(item.pin[0]));
    pin.setAttribute("cy", String(item.pin[1]));
    pin.setAttribute("r", "7");
    pin.setAttribute("aria-label", item.name);
    mapPinsEl.appendChild(pin);

    const legend = document.createElement("li");
    legend.textContent = `${index + 1}. ${item.name}`;
    mapLegendEl.appendChild(legend);
  });
}

function renderHotels() {
  hotelsEl.innerHTML = "";
  state.hotels.forEach((hotel) => {
    const card = document.createElement("article");
    card.className = "hotel-card";
    card.innerHTML = `
      <div class="hotel-image" style="background-image: url('${hotel.image}')"></div>
      <div class="hotel-body">
        <h4>${hotel.name}</h4>
        <div class="hotel-meta">${hotel.rating} stars | ${hotel.area} | $${hotel.price}/night</div>
        <a class="button button-small" href="${hotel.bookingUrl}" target="_blank" rel="noopener noreferrer">Book</a>
      </div>
    `;

    hotelsEl.appendChild(card);
  });
}

function applyRefinement(type) {
  if (type === "cheaper") {
    state.hotels = state.hotels.map((hotel) => ({
      ...hotel,
      price: Math.max(129, hotel.price - 28)
    }));

    state.estimatedCost = Math.max(1280, state.estimatedCost - 320);
    state.summary = "Budget-optimized version with central 4-star stays under $200/night and lower daily transport costs.";
  }

  if (type === "park") {
    const index = state.itinerary.findIndex((item) => item.name.includes("Picasso Museum"));
    if (index >= 0) {
      state.itinerary[index] = {
        day: "Day 1",
        time: "14:00",
        name: "Ciutadella Park Picnic",
        description: "Relaxed afternoon in a large urban park with rowing lake views.",
        address: "Passeig de Picasso, Barcelona",
        hours: "Open all day",
        pin: [150, 140]
      };
      state.summary = "Balanced culture-and-nature itinerary with a lower-stress afternoon park stop.";
    }
  }

  renderAll();
}

function renderAll() {
  renderOverview();
  renderItinerary();
  renderHotels();
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setMode(tab.dataset.mode));
});

document.querySelectorAll("[data-refine]").forEach((button) => {
  button.addEventListener("click", () => applyRefinement(button.dataset.refine));
});

renderAll();
