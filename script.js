const Typewriter = function(txtElement, words, wait = 3000){
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
}

//Type Method

Typewriter.prototype.type = function() {
  //Current
  const current = this.wordIndex % this.words.length;

  //Get full text on current word
  const fullTxt = this.words[current];

  //Check if Deleting
  if(this.isDeleting){
    //Remove Char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  }
  else {
    //Add Char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  //Insert into Element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  //Type Speed
  let typeSpeed = 300; //Initial speed
  if(this.isDeleting){
    typeSpeed /= 2;
  }

  //If Word is complete
  if(!this.isDeleting && this.txt === fullTxt)
  {
    //Make pause at end
    typeSpeed = this.wait;
    //set delete true
    this.isDeleting = true;
  }
  else if (this.isDeleting && this.txt === '') {
    //Move to next word
    this.isDeleting = false;
    this.wordIndex +=1;
    //Pause before start typing
    typeSpeed = 500;
  }
  setTimeout(()=>this.type(), typeSpeed)
}

//Init On Dom Load
document.addEventListener('DOMContentLoaded', init);
//Init App
function init(){
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  //Init Typewritter
  new Typewriter(txtElement, words, wait);
}
