const mainImage = document.querySelector(".image-block img");
const loadBtn = document.querySelector(".btn");
const loader = document.querySelector(".loader");
const historyWrapper = document.querySelector(".history");

const api = "https://randomfox.ca/floof/";

function setLoader(status) {
  if (status) {
    loader.style.opacity = 1;
    loadBtn.classList.add("disabled");
    loadBtn.textContent = "Wait!";
  } else {
    loader.style.opacity = 0;
    loadBtn.classList.remove("disabled");
    loadBtn.textContent = "Get New Fox";
  }
}
function setHistory(image) {
  const data = new Date().toLocaleString();
	const time = document.createElement("p");
  console.log(data);
  const historyImg = document.createElement("img");
  const historyDiv = document.createElement("div");

  historyImg.classList.add("history-img");
  time.textContent = data;
  historyImg.src = image;
  historyWrapper.prepend(historyDiv);
  historyDiv.append(historyImg);
  historyDiv.append(time);
}
async function getFox() {
  setLoader(true);
  const res = await fetch(api);
  const data = await res.json();
  mainImage.src = data.image;
  setHistory(data.image);
}

getFox();

loadBtn.addEventListener("click", getFox);
mainImage.addEventListener("load", () => {
  setLoader(false);
	
});
historyWrapper.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("history-img")) {
    mainImage.src = target.src;
  }
});
historyWrapper.addEventListener("dblclick", (e) => {
  const target = e.target;
  if (target.classList.contains("history-img")) {
    target.parentNode.remove();
    historyDiv.remove();
  }
});
