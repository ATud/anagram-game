AnagramGame = function AnagramGame() {

  this.init = function init(){
    //this function initializes all the necessary variables such as scorelist, pathToDirectory,
    // it also initializes the dictionary that is read from the TXT file. 
    this.scoreList={};
    this.pathToDictionary="./resource/dictionary.txt";
    readDictionary(this.pathToDictionary);
    var testElement = document.getElementById('submitAnagram');
    testElement.addEventListener('click', this, false);

  };

  this.handleEvent = function(){
    //this function handles the click event added on the input button
    var testElement = document.getElementById('inputAnagram');
    this.submitWord(testElement.value);
  }

   /**
    * Submit a word on behalf of a user. A word is accepted if its letters are
    * contained in the base string used to construct the game AND if it
    * is in the word list at http://www.bonzagaming.com/codetest/wordlist.txt.
    * If the word is accepted and its score is high enough, the submission
    * should be added to the high score list. If there are multiple submissions
    * with the same score, all are accepted, but the first submission with that
    * score should rank higher.
    *
    * @parameter word User's submission. All submissions may be assumed to be
    *             lowercase and containing no whitespace or special
    *             characters.
    */
  this.submitWord = function submitWord(word) {
    //this functions submits the word (inserts into the scoreList Object) the element that respects both the conditions
    // it is in dictionary and is anagram. please keep in mind that if you enter a word twice, it score will be calculated and the word entered in the list
    // the object keeps a key value pair , where key is the score, and value represents, all the words entered with this score, concatenaded by coma.
    if (dictionary.contains(word) && (this.wordIsAnagram(word))){
      if (this.scoreList[word.length]){
        this.scoreList[word.length] = this.scoreList[word.length] + ',' + word; 
      }
      else{
        this.scoreList[word.length] = word;
      }
    }
    else{
      alert('not an anagram');
    }

    this.refreshHighScoreList();
    
  };

   /**
    * Return word entry at given position in the high score list, 0 being the
    * highest (best score) and 9 the lowest. You may assume that this method
    * will never be called with position > 9.
    *
    * @parameter position Index on high score list
    * @return word entry at given position in the high score list, or null if
    *         there is no entry at that position
    */
  this.getWordEntryAtPosition = function getWordEntryAtPosition(position) {
    //this function returs the value of an UNKNOWN key, because i know the position and i have to retrieve the value, but the key isn't known
    var returnedElement = this.getElementAtPosition(position);
    var wordsAtPosition='';
    if (returnedElement){
      for(var propName in returnedElement) {
        if(returnedElement.hasOwnProperty(propName)) {
            wordsAtPosition = returnedElement[propName];
        }
      }  
    }
    return wordsAtPosition;
  };

   /**
    * Return score at given position in the high score list, 0 being the
    * highest (best score) and 9 the lowest. You may assume that this method
    * will never be called with position > 9.
    *
    * @parameter position Index on high score list
    * @return score at given position in the high score list, or null if there
    *         is no entry at that position
   *  What is your favourite color? Please put
   *  your answer in your submission (this is for testing if you have read the
   * comments).
    */
  this.getScoreAtPosition = function getScoreAtPosition(position) {
    //similar to getWordEntryAtPosition, i retrieve the key for the certain position, where key represents the score
    var returnedElement = this.getElementAtPosition(position);
    var scoreAtPosition='';
    if (returnedElement){
      for(var propName in returnedElement) {
        if(returnedElement.hasOwnProperty(propName)) {
            scoreAtPosition = propName;
        }
      }  
    }
    return scoreAtPosition;
  };


  this.getElementAtPosition = function getElementAtPosition(position){
    // this function brings me the whole elemente (pair = key-value), for a certain position
    i=0;
    var objectReturned={};
    for (var element in this.scoreList){
      if (position == i){
        objectReturned[element] = this.scoreList[element];
        return objectReturned;
      }
      else {
        i++;
      }
    }
    return undefined;
  }

  this.wordIsAnagram = function wordIsAnagram(word) {
      //i can check if a word is ppartial anagram , by looping over it's letter, and checking if the letters exist in base string
      var originalWord = document.getElementById('inputWord').value;
      for (var i=0; i<word.length; i++){
        if(!(originalWord.indexOf(word[i])>-1)){
          return false;
        }
      }
      return true;
   };


  this.refreshHighScoreList = function refreshHighScoreList(){
    //everytime I submit a score I clear the list of the elements, and then,
    //recostruct the list using the new elements . I will create a LI that contains for each element the key(score) - value(words) pair

    var ulElement = document.getElementById('result-list');
    ulElement.innerHTML = '';
    for (var i=0; i < 10; i++){
      if (this.getScoreAtPosition(i)){
        var li = document.createElement("li");
        li.innerHTML = 'Score: ' + this.getScoreAtPosition(i) + ' words: ' + this.getWordEntryAtPosition(i);
        ulElement.appendChild(li);  
      }
    }
  }


  var readDictionary = function readDictionary(pathToFile)
  {
    //this was the sollution i thought, i don't really having this in variable , so i have imported the text file via xmlxttprequest, 
    //and the  I have splitted the textfile by the CARRIAGE RETURN , resulting an array with all the words
    var dictionaryText = '';
    if (typeof XMLHttpRequest === "undefined") {
      XMLHttpRequest = function () {
        try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
        catch (e) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
        catch (e) {}
        try { return new ActiveXObject("Microsoft.XMLHTTP"); }
        catch (e) {}
        throw new Error("This browser does not support XMLHttpRequest.");
      };
    }
    var file = new XMLHttpRequest();
    file.open("GET", pathToFile, false);
    file.onreadystatechange = function ()
    {
        if(file.readyState === 4)
        {
            if(file.status === 200 || file.status == 0)
            {
                dictionary = file.responseText.split('\n');
            }
        }
    }
    file.send(null);
  }
}