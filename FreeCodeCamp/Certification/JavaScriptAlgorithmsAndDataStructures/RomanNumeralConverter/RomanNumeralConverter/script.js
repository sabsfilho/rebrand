const number = document.getElementById('number');
const output = document.getElementById('output');

const write = (x)=>{output.textContent = x};

const dic = {
  1:'I',
  4:'IV',
  5:'V',
  9:'IX',
  10:'X',
  40:'XL',
  50:'L',
  90:'XC',
  100:'C',
  400:'CD',
  500:'D',
  900:'CM',
  1000:'M'
};

const getZ = (v)=>{
  let z = -1;
  for(let x in dic){
    if (x<=v) z = x;
    else break;
  }
  return z
};

const convert = (v)=>{
  if (v===0) return ''
  const z = getZ(v);
  return dic[z] + convert(v-z)
};

document.getElementById('convert-btn').addEventListener('click', ()=>{
  const v = parseInt(number.value);
  if (isNaN(v)){
    write('Please enter a valid number');
    return
  }
  else if (v < 1){
    write('Please enter a number greater than or equal to 1');
    return
  }
  else if (v >= 4000){
    write('Please enter a number less than or equal to 3999');
    return
  }

  write(convert(v))

})
