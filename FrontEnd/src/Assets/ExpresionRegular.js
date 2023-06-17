const regexNumbers = /^[0-9]+$/;

const regexLetter = /^[a-zA-Z]+$/;

const 
regexLetterAndSpace = /^[a-zA-Z ]+$/;

const regexNumberAndLetter = /^[a-zA-Z0-9]+$/;

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export{
  regexNumbers,
  regexNumberAndLetter,
  regexEmail,
  regexLetter,
  regexLetterAndSpace
}