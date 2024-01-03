const userInput = document.getElementById('user-input');
const result = document.getElementById('results-div');

const isValid = v =>
  new RegExp(
    [
      '^(1\\s?)?', //countrycode (1)
      '(\\([0-9]{3}\\)|[0-9]{3})', //regionalcode 999, "(999)"
      '[\\s\\-]?', //space " ","-"
      '[0-9]{3}[\\s\\-]?[0-9]{3,4}$', //phonenumber 999 9999
    ].join('')
  ).test(v);

const test = ()=>{
  let gok = true;
  const chk = (b,xs)=>{
    console.log(`*** ${(b?'VALID':'INVALID')} ***`);
    xs.forEach((v)=>{
      const y = isValid(v), ok = (b&&y)||(!b&&!y);
      if (!ok) gok = false;
console.log(`${v}: ${(ok?'ok':'nok')}`)
    });
console.log(`*** ${(gok)? "OK" : "NOK"} ***`);
  };
chk(true, [
  '1 555-555-5555',
  '1 (555) 555-5555',
  '5555555555',
  '555-555-5555',
  '(555)555-5555',
  '1(555)555-5555',
  '1 555 555 555',
  '1 456 789 4444',
]);
gok = true;
chk(false, [
  '555-5555',
  '5555555',
  '1 555)555-555',
  '123**&!!asdf#',
  '55555555',
  '(6054756961)',
  '2 (757) 622-7382',
  '0 (757) 622-7382',
  '-1 (757) 622-7382',
  '2 757 622-7382',
  '10 (757) 622-7382',
  '27576227382',
  '(275)76227382',
  '2(757)6227382',
  '2(757)622-7382',
  '555)-555-5555',
  '(555-555-5555',
  '(555)5(55?)-5555',
  '55 55-55-555-5',
  '11 555-555-5555',
]);
};

//test();

const check = () => {
  const v = userInput.value;
  if (v===''){
    alert('Please provide a phone number');
    return
  }
  const key = isValid(v)?'Valid':'Invalid';
  result.innerHTML += `<div class="${key.toLowerCase()}"><span>${key} US number: </span><span>${v}</span></div>`;
};
const clear = () => {
  userInput.value = '';
  result.textContent = '';
};

document.getElementById('check-btn').addEventListener('click', check);
document.getElementById('clear-btn').addEventListener('click', clear);
