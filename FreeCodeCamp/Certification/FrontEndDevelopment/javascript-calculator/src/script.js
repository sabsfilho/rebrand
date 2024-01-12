import ReactDOM from "https://esm.sh/react-dom";

const MAP = {
  nums: { 
    seven: 7, 
    eight: 8, 
    nine: 9,
    four: 4, 
    five: 5, 
    six: 6,
    one: 1, 
    two: 2, 
    three: 3, 
    zero: 0, 
    decimal: '.',
  },
  ops: {
    add: '+', 
    subtract: '-',
    multiply: '*',
    divide: '/',
  },
  fns: {
    equals: '=',
    clear: 'C'
  },
};

const CalcProc = function(){

  const OPS = new Map([
    ['*',(a,b)=>a*b],
    ['/',(a,b)=>a/b],
    ['+',(a,b)=>a+b],
    ['-',(a,b)=>a-b]
  ]);
  
  const calc = (expr, regex) => {

    const r = expr.replace(regex, (_match, arg1, operator, arg2) => OPS.get(operator)(parseFloat(arg1), parseFloat(arg2)));

    return expr === r ? r : calc(r,regex);
  };
  
  return {
    isOps: k => OPS.has(k),
    calc: x => [
        /([-]?[\d.]+)([*\/])([-]?[\d.]+)/, 
        /([-]?[\d.]+)([+-])([-]?[\d.]+)/
      ].reduce((t,v)=>calc(t, v), x)
  }
}();

const defaultState = {
  expr: '0'
};

class Calculator extends React.Component {
  constructor(props){
    super(props)
    this.state = defaultState;
    this.handleClick = this.handleClick.bind(this);
  }
  hasPoint(v){
    for(let i=v.length-1;i>=0;i--){
      const c = v[i];
      if (c ==='.') {
        return true;
      }
      if (CalcProc.isOps(c)){
        return false;
      }
    }
    return false
  }
  buildExpr(k){
    let v = this.state.expr;
    switch(k){
      case 'C':
        return '0'
      case '=':
        return CalcProc.calc(v)
      default:
        if (v == '0' && k != '.'){          
          return k
        }
        if (k == '.' && v.length > 1 && this.hasPoint(v)){
          return v
        }
        if (CalcProc.isOps(k)){
/*
13. If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign.
*/        
          if (v.length > 0) {
            const kminus = k == '-';
            const c1 = v[v.length-1];
            const c1minus = c1 == '-';
            if (kminus && c1minus){
              return v
            }
            const c1ops = CalcProc.isOps(c1);
            if (c1ops){
              const c2 = v.length > 1 ? v[v.length-2] : '';
              const c2ops = CalcProc.isOps(c2);

              const minusok = kminus && !c2ops && v.length > 1;

              if (!minusok){
                const z = c1ops && c2ops ? 2 : 1;
                v = v.substring(0, v.length-z);
              }
            }
          }
        }
        return [v,k].join('')
    }
  }
  handleClick(e){
    const id = e.target.id, v = this.state.expr;
    let k = MAP.nums[id];
    if (k!='.' && isNaN(k)){
      k = MAP.ops[id];
      if (!k) {
        k = MAP.fns[id];
      }
    }
    this.setState({
      expr: this.buildExpr(k)
    })
  }
  buildBtns(k){
    const z = MAP[k], xs = [];
    for(const x in z){
      xs.push(
        <button class="btn" id={x} onClick={this.handleClick}>{z[x]}</button>
      )
    }
    return xs
  }
  render(){
    return (
      <div>
        <div id="display">{this.state.expr}</div>
        <div class="nfs">
          <div class="nums">{this.buildBtns('nums')}</div>
          <div class="ops">{this.buildBtns('ops')}</div>
        </div>
        <div class="fns">{this.buildBtns('fns')}</div>
      </div>
    )
  }
}

ReactDOM.render(<Calculator />, document.getElementById('calculator'));

//document.getElementById('calculator').innerHTML = CalcProc.calc('5-9+5-3+5');