let ads = JSON.parse(localStorage.getItem("autoAds")) || [];
ads = [
  {
    id: 1,
    title: "Honda City 2018",
    price: 650000,
    desc: "Well maintained Honda City 2018, petrol, 45000 km run, single owner.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8n04J204IzNeNBIwTR5eVbgRI-zXwWc50rQ&s",
    category: "Car",
    time: new Date().toLocaleString(),
    sold: false
  },
  {
    id: 2,
    title: "Maruti Swift 2017",
    price: 500000,
    desc: "Maruti Swift VDI 2017 model, diesel, excellent condition.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC0gN0cw9NP-wCDKG5dceGSVo9JPmAGeqfDA&s",
    category: "Car",
    time: new Date().toLocaleString(),
    sold: false
  },
  {
    id: 3,
    title: "Royal Enfield Classic 350",
    price: 120000,
    desc: "Royal Enfield Classic 350, black, 10000 km run, very good condition.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD5VC7xV4gsonNtjl-lEwlegZUDfGRsl8Umg&s",
    category: "Bike",
    time: new Date().toLocaleString(),
    sold: false
  },
  {
    id: 4,
    title: "Honda Activa 2019",
    price: 55000,
    desc: "Honda Activa 2019, automatic scooter, excellent condition.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwfl9d73CzVP8Q9DXRb-ehrSgoJOm8fLUlTg&s",
    category: "Bike",
    time: new Date().toLocaleString(),
    sold: false
  }
];

function saveAds() {
  localStorage.setItem("autoAds", JSON.stringify(ads));
}

function postAd() {
  const title = document.getElementById("title").value.trim();
  const price = document.getElementById("price").value.trim();
  const desc = document.getElementById("description").value.trim();
  const img = document.getElementById("image").value.trim() || "https://source.unsplash.com/400x300/?vehicle";
  const category = document.getElementById("category").value;

  if (!title || !price || !desc) {
    alert("Please fill all fields!");
    return;
  }

  const ad = {
    id: Date.now(), // unique id
    title,
    price,
    desc,
    img,
    category,
    time: new Date().toLocaleString(),
    sold: false
  };

  ads.unshift(ad);
  saveAds();
  displayAds();
  clearForm();
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("price").value = "";
  document.getElementById("description").value = "";
  document.getElementById("image").value = "";
}

function buyProduct(id) {
  const ad = ads.find(item => item.id === id);
  if (ad && !ad.sold) {
    ad.sold = true;
    saveAds();
    alert(`✅ You purchased "${ad.title}" for ₹${ad.price}!`);
    displayAds();
  } else {
    alert("❌ This product is already sold!");
  }
}

function displayAds() {
  const adList = document.getElementById("adList");
  adList.innerHTML = "";

  ads.forEach(ad => {
    const card = document.createElement("div");
    card.className = "ad-card";

    // Create image
    const img = document.createElement("img");
    img.src = ad.img;
    img.alt = ad.title;
    card.appendChild(img);

    // Title
    const h3 = document.createElement("h3");
    h3.textContent = ad.title;
    card.appendChild(h3);

    // Description
    const pDesc = document.createElement("p");
    pDesc.textContent = ad.desc;
    card.appendChild(pDesc);

    // Price
    const pPrice = document.createElement("p");
    pPrice.className = "price";
    pPrice.textContent = `₹${ad.price}`;
    card.appendChild(pPrice);

    // Category and time
    const small = document.createElement("small");
    small.textContent = `${ad.category} | Posted on ${ad.time}`;
    card.appendChild(small);

    // Line break
    card.appendChild(document.createElement("br"));

    // Buy button
    const btn = document.createElement("button");
    btn.className = "buy-btn";
    btn.textContent = ad.sold ? "✅ Sold" : "Buy Now";
    btn.disabled = ad.sold;
    if (!ad.sold) {
      btn.onclick = () => buyProduct(ad.id);
    }
    card.appendChild(btn);

    adList.appendChild(card);
  });
}

// Initial load
displayAds();
function clearAll() {
  if(confirm("Are you sure you want to remove all ads?")) {
    ads = [];
    localStorage.removeItem("autoAds");
    displayAds();
  }
}
