import ReactDOM from "https://esm.sh/react-dom";

const QUOTE_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

const queryQuote = async (cb) => {
  try {
    const res = await fetch(QUOTE_URL);
    if (res.ok){
      cb(await res.json())
    }
    else{
      console.log('invalid response')
    }
  } catch (err) {
    console.log(err)
  }
};

const MsgBlock = (props) => {
  
    if (props.state.loading){
      return (
        <div class="loading">Loading...</div>
      )
    }
  
    return(
        <div>
          <div id="text">{props.state.quote}</div>
          <div id="author">{props.state.author}</div>
        </div>
    );
};

const TwitterButton = (props) => {  
  return <a class="btn" id="tweet-quote" title="Tweet this quote" href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURI(props.state.quote)}`}>Tweet Quote</a>
};

const NewQuoteButton = (props) => {
  return <button class="btn" id="new-quote" onClick={props.onClick}>New Quote</button>
};

const defaultState = {
  author: '',
  quote: '',
  quotes: [],
  loading: true
};

class QuoteBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;    
    this.getQuote = this.getQuote.bind(this)
  }
  componentDidMount(){    
    queryQuote((o)=>{
      defaultState.quotes = o.quotes;
      this.setState(defaultState);
      this.getQuote()
    })
  }
  getQuote(){
    const qs = this.state.quotes;
    if (qs.length === 0) return;
    const n = Math.floor(Math.random()*(qs.length-1));
    const x = Object.assign({
      loading: false
    }, qs[n]);
    this.setState(x);
  }
  render(){
    return (<div>
        <MsgBlock state={this.state} />
        <div class="btns">
          <TwitterButton state={this.state} />
          <NewQuoteButton onClick={this.getQuote} />
        </div>
    </div>);
  }
};
      
ReactDOM.render(<QuoteBlock />, document.getElementById('quote-box'));
