//let price = 1.87;
let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];
let cashInDrawer = parseFloat(cid.reduce((t,x)=>t+x[1], 0).toFixed(2));
let changeDueValue = 0;
/* SORTED */
const cidn = {
  "PENNY": { n:"Pennies", v: 0.01 },
  "NICKEL": { n:"Nickels", v: 0.05 },
  "DIME": { n:"Dimes", v: 0.1 },
  "QUARTER": { n:"Quarters", v: 0.25 },
  "ONE": { n:"Ones", v: 1 },
  "FIVE": { n:"Fives", v: 5 },
  "TEN": { n:"Tens", v: 10 },
  "TWENTY": { n:"Twenties", v: 20 },
  "ONE HUNDRED": { n:"Hundreds", v: 100 }
};

const changeDue = document.getElementById('change-due');
const cashInput = document.getElementById('cash');

const priceInput = document.getElementById('price');

const cidInput = document.getElementById('cash-in-drawer');

const updateCID = arr=>{
  const getN = x=>`${x.n}[$${x.v.toFixed(2)}]`;
  cidInput.innerHTML = arr.map((x)=>`<div>${getN(cidn[x[0]])}: ${x[1].toFixed(2)}</div>`).join('');  
  cidInput.innerHTML += `<div>Total: ${cashInDrawer}</div>`
  cidInput.innerHTML += `<div>Change Due: ${changeDueValue.toFixed(2)}</div>`
};

const refresh = ()=>{  
  priceInput.textContent = `Price: $${price}`;
  updateCID(cid);
};

const setStatus = (sts, hs) => {
  changeDue.innerHTML = `<div>Status: ${sts}</div>`;
  if (hs && hs.length > 0){
    changeDue.innerHTML += hs.map((h)=>`<div>${h[0]}: $${h[1]}</div>`).join('')
  }
};

const calc = (cash)=>{
  //change due
  let v = floatPointerFix(cash - price);
  changeDueValue = v;

  if (v > cashInDrawer){
    setStatus('INSUFFICIENT_FUNDS')
    return
  }
  if (v === cashInDrawer){
    setStatus('CLOSED')
    return
  }

  let w = 0;
  const rs = [];
  for(const x in cidn) {
    const z = cidn[x];
    if (v < z.v){
      break
    }
    w = z.v;
    rs.push([w, cid.find((y)=>y[0]===x)]);
  }
const hs = [];
  for(let i=rs.length-1;i>=0;i--){
    const r=rs[i], k = r[0], xcid = r[1], l = xcid[1],
    u = parseInt(Math.floor(v / k));
    let q = k * u;
    //console.log([v,k,u,l,q]);
    if (q>0){
      if (q > l) q = l;
      xcid[1] -= q;
      //quirck float pointer
      v = floatPointerFix(v - q);
      hs.push([xcid[0],q])
    }
  }
  //console.log(v);
  //console.log(hs);
  if (v === 0) {
    cashInDrawer = floatPointerFix(cashInDrawer - changeDueValue);
    setStatus('OPEN', hs)
  }
  else {
    setStatus('INSUFFICIENT_FUNDS')
  }

};

const floatPointerFix = (v)=>parseFloat(v.toFixed(2));

const purchase = ()=>{
  
  changeDue.textContent = '';

  const cash = parseFloat(cashInput.value);  
  
  if (isNaN(cash)) {
    alert('Enter a valid cash value');
    return
  }
  if (cash < price){
    alert('Customer does not have enough money to purchase the item');
    return
  }
  if (cash === price){
    changeDue.textContent = 'No change due - customer paid with exact cash';
    return
  }
  
  calc(cash);

  refresh()
};

document.getElementById('purchase-btn').addEventListener('click', purchase);

refresh()
