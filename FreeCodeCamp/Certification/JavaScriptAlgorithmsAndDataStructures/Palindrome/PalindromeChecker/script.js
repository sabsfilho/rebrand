const checkBtn = document.getElementById('check-btn');
const textInput = document.getElementById('text-input');
const result = document.getElementById('result');

const isPalindrome = (v)=>{
  const xs = v.toLowerCase().split('').filter((x)=>x.match(/[\da-z]/));
  return xs.join('')===xs.reverse().join('')
}

const check = ()=>{
  const inputValue = textInput.value;
  if (inputValue.length == 0){
    alert('Please input a value');
    result.style.display = 'none';
    return
  }
  if (isPalindrome(inputValue)){
    result.textContent = `${inputValue} is a palindrome`;
  }
  else{
    result.textContent = `${inputValue} is not a palindrome`;
  }
  result.style.display = 'block';
};

checkBtn.addEventListener('click', check);
