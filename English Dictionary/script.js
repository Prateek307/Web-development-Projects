const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");
const sound = document.getElementById("sound");

// Define playSound function in the global scope
function playSound(audioUrl) {
  sound.src = audioUrl;
  sound.play();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();

    resultDiv.innerHTML = `
        <h2>${data[0].word} &#8207; <button onclick="playSound('${data[0].phonetics[0].audio}')">🔊</button></h2>
        <p><em>${data[0].meanings[0].partOfSpeech}</em></p>
        <p><strong>Meaning  : </strong>${data[0].meanings[0].definitions[0].definition === undefined ? "Meaning not found" : data[0].meanings[0].definitions[0].definition}</p>
        <p><strong>Example  : </strong>${data[0].meanings[0].definitions[0].example === undefined ? "Example not found" : data[0].meanings[0].definitions[0].example}</p>
        <p><strong>Antonyms : </strong>${getAntonyms(data)}</p>
        <p><strong>Synonyms : </strong>${getSynonyms(data)}</p>
        <br>
        <p><a class="anchor"  href="${data[0].sourceUrls}" target="_blank">Read more</a></p>
    `;

    function getAntonyms(data) {
      const antonyms = data[0].meanings[0].definitions[0].antonyms;

      if (antonyms.length === 0) {
        return "Antonym not found";
      } else {
        return antonyms.join(", ");
      }
    }

    function getSynonyms(data) {
      const synonyms = data[0].meanings[0].definitions[0].synonyms;

      if (synonyms.length === 0) {
        return "Synonym not found";
      } else {
        return synonyms.join(", ");
      }
    }
  } catch (error) {
    resultDiv.innerHTML = `<h4>Sorry result not found :(</h4>`;
  }
};
