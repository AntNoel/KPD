//jshint esversion: 6
//How to keep them on site? Play off curiousity

//Import the database functions
// import {loadDatabase, getWord} from './database.js';



const words = [{
    name: "Pale",
    audio: "pale.mp3",
    definition: {
      "to speak, to talk(to articulate words)": "Lap pale ak mennaj li - He's speaking with his girlfriend."
    },
    examples: [
      "Mwen renmen pale avek li anpil. - I really like talking with him.",
      "Pandan met la ap pale, pran not - While the teacher is talking, take notes.",
      "Li gen anpil pale. - He has alot of talk."
    ],
    phrases: [
      "Pale angle pase rat. - To speak English like a native",
      "Pale fo. - To talk loudly"
    ],

  }, //, and continue with another word
  {
    name: "Paler",
    audio: "",
    definition: {
      "sdsokdok": "di - sidjisjdj"
    },
    examples: [
      ""
    ],
    phrases: [
      ""
    ],
  },
  {
    name: "Palet"
  },
  {
    name: "Palor"
  },
  {
    name: "Palmas"
  }
];

//UI Elements for easy access
const wordSearchBox = document.getElementById("wordInput");
const header = document.querySelector("header");





const formatExample = (fullExample) => {
  let creolePart = fullExample.slice(0, fullExample.lastIndexOf("-") + 1);
  newFullExample = fullExample.replace(creolePart, creolePart.bold());
  return newFullExample;
};


const organizeWordDefinitions = (objDefs) => {
  let organizedDef = "";
  let defTitlesArray = Object.keys(objDefs);
  let objDefsValuesArray = Object.values(objDefs);

  //Bold each creole part of the examples
  objDefsValuesArray.forEach((example, i) => {
    objDefsValuesArray[i] = formatExample(example);
  });


  objDefsValuesArray.forEach((definition, i) => {

    organizedDef += `${i+1}. ${defTitlesArray[i]}\r\n${objDefsValuesArray[i]}\r\n`;
  });


  return organizedDef;
};
//Fix this
const displayWord = (wordName) => {
  let word = wordName;
  words.forEach((wordInDatabase, i) => {
    if (word === wordInDatabase.name) {
      word = wordInDatabase;

    }

  });


  //Formatting and displaying of definition
  let wordNameList = document.querySelectorAll(".wordName");
  wordNameList.forEach((wordNameElement, i) => {
    wordNameElement.textContent = word.name;
  });
  document.querySelector("h1.wordName").style.display = "inline-block";
  document.querySelector("button.playButton").style.display = "inline-block";
  // document.querySelector(".wordName").textContent = word.name;
  let totalWordDefinitions = organizeWordDefinitions(word.definition);

  document.querySelector(".wordDef").setAttribute('style', 'white-space: pre;');
  document.querySelector(".wordDef").innerHTML = totalWordDefinitions;

  //Formatting and displaying of Examples
  document.querySelector(".wordExam").setAttribute('style', 'white-space: pre;');
  document.querySelector(".wordExam").innerHTML = "";
  word.examples.forEach((example, i) => {

    document.querySelector(".wordExam").innerHTML += `${formatExample(example)}\r\n`;
  });

  //Formatting and displaying of phrases
  document.querySelector(".wordPhrase").innerHTML = "";
  document.querySelector(".wordPhrase").setAttribute('style', 'white-space: pre;');
  word.phrases.forEach((phrase, i) => {
    document.querySelector(".wordPhrase").innerHTML += `${formatExample(phrase)}\r\n`;
  });

  //Set the playButton to the corresponding mp3 audio when clicked
  console.log(word.audio);
  //aAdd an audio file to test
  // document.querySelector(".playButton").onclick = function() {
  //   console.log("Play the audio: " + word.audio);
  //   let audio = new Audio(word.audio);
  //   audio.play();
  // };


};
/*Search bar functionality
1. You type in something and it shows suggestions, you can click on those and it will display the word
  follow types with list and it it fits something, create an element in the position under the search bar.
2.If you type in a word and press enter it will display the word or make an outline of red around the bar or display
*/

//Activated with user types
const displaySuggestionList = () => {
  //debugger not working?
  //Grab what was typed into the input Element
  const wordInInput = wordSearchBox.value.toLowerCase();

  //Check if there is already a suggestionbox on the window, and removes it
  //Fix bug here where this isn't working for all words!!
  if(getSuggestionBox()) {
      removeSuggestionBox();
  }


  //Compare the input typed to the wordnames in the database and get suggestions
  const wordSuggestions = getWordSuggestions(5);

  //create suggestions +list to display those to the user
  const suggestionList = createSuggestionList(wordSuggestions);

  //append the suggestion list to the header
  header.appendChild(suggestionList);
};

//Checks if a SuggesionBox already exists
const getSuggestionBox = () => {
    return document.getElementById("SuggestionUL"); //Grabs the first suggestion box on the window

};

const removeSuggestionBox = () => {
  //Deletes itself by accessing the parent and removing it's child
  document.getElementById("SuggestionUL").parentNode.removeChild(document.getElementById("SuggestionUL"));
};

const getWordSuggestions = (suggestionNumber) => {
  //Filters the words array for words that have the same letters as what's in the searchbox
  //Cuts it down to 5 suggestions and returns
  matchingWords = words.filter(function(word) {
    return (word.name.toLowerCase().search(wordSearchBox.value.toLowerCase()) > -1 && (wordSearchBox.value.toLowerCase()));
  });
  matchingWords.splice(suggestionNumber);
  console.log(matchingWords.length);
  return matchingWords;

};


//Used to make a UL
const createSuggestionList = (wordList) => {
  //Create a un ordered list and give it styling
  const suggestionList = document.createElement("ul");
  suggestionList.setAttribute("id", "SuggestionUL");
  //Create li and add it to the list
  wordList.forEach((word, i) => {
    suggestionList.appendChild(createSuggestionTile(word.name));
  });
  //return the suggestion list element

  return suggestionList;


};
const createSuggestionTile = (name) => {
  //Create a new li Element and an anchor inside of it
  const suggestionTile = document.createElement("li");
  let suggestionLink = document.createElement("a");
  suggestionTile.appendChild(suggestionLink);

  //Give it the  name parameter as it's textcontent/innerHTML
  let nameNode = document.createTextNode(name);
  suggestionLink.appendChild(nameNode); //Adds the name to the tile

  //Make the href link # and the onclick display a word
  suggestionLink.href = "#";
  suggestionLink.onclick = function() {
    displayWord(name);
    //Get rid of suggestionbox
    document.getElementById("SuggestionUL").parentNode.removeChild(document.getElementById("SuggestionUL"));
    //Empty the word input
    document.getElementById("wordInput").value = "";
  };

  //Style it accordingly
  //Will get added when the id it added to the suggestionlist

  //return it to add to a suggestion list

  return suggestionTile;

};








//displayWord("Pale");
