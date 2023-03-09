const inputEl = document.getElementById("input");
const infoEl = document.getElementById("info");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

const fetchData = async (word) => {
  try {
    infoEl.style.display = "block";
    meaningContainerEl.style.display = "none";
    infoEl.innerText = `Searching please wait......`;
    const baseurl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(baseurl).then((response) => {
      return response.json();
    });
    if (result[0].word !== word) {
      infoEl.style.display = "none";
      meaningContainerEl.style.display = "block";
      titleEl.innerText = result.title;
      meaningEl.innerText = result.message;
      audioEl.style.display = "none";
    }
    infoEl.style.display = "none";
    meaningContainerEl.style.display = "block";
    titleEl.innerText = result[0].word;
    meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
    audioEl.style.display = "inline-flex";
    audioEl.src = result[0].phonetics[0].audio;
  } catch (error) {
    console.log(error);
    infoEl.innerText = `An error has found. please! try again later`;
  }
};

inputEl.addEventListener("keyup", (event) => {
  if (event.target.value && event.key === "Enter") {
    fetchData(event.target.value);
  }
});
