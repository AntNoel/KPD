//jshint esversion: 8
//All interactions with the "Words" database will take place there
//Better to grab the database all at once so you can use it offline too
//functions: getWord, loaddatabase

//Add firebase scripts

//Load the full database asynchronously
const loadDatabase = async () => {
  try {
    //Call to firebase for the collection and return it

  } catch(e) { //Catch and display any errors
    console.log(e);
    console.log("Database not found!");
  }


};

const getWord = async (word = "") => {
  //Search the database for that word
  
};



export {loadDatabase, getWord};
