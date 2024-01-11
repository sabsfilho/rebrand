import ReactDOM from "https://esm.sh/react-dom";

const QUOTE_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

const queryQuote = async cb => {
  try {
    const res = await fetch(QUOTE_URL);
    if (res.ok) {
      cb(await res.json());
    } else
    {
      console.log('invalid response');
    }
  } catch (err) {
    console.log(err);
  }
};

const MsgBlock = props => {

  if (props.state.loading) {
    return /*#__PURE__*/(
      React.createElement("div", { class: "loading" }, "Loading..."));

  }

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("div", { id: "text" }, props.state.quote), /*#__PURE__*/
    React.createElement("div", { id: "author" }, props.state.author)));


};

const TwitterButton = props => {
  return /*#__PURE__*/React.createElement("a", { class: "btn", id: "tweet-quote", title: "Tweet this quote", href: `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURI(props.state.quote)}` }, "Tweet Quote");
};

const NewQuoteButton = props => {
  return /*#__PURE__*/React.createElement("button", { class: "btn", id: "new-quote", onClick: props.onClick }, "New Quote");
};

const defaultState = {
  author: '',
  quote: '',
  quotes: [],
  loading: true };


class QuoteBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.getQuote = this.getQuote.bind(this);
  }
  componentDidMount() {
    queryQuote(o => {
      defaultState.quotes = o.quotes;
      this.setState(defaultState);
      this.getQuote();
    });
  }
  getQuote() {
    const qs = this.state.quotes;
    if (qs.length === 0) return;
    const n = Math.floor(Math.random() * (qs.length - 1));
    const x = Object.assign({
      loading: false },
    qs[n]);
    this.setState(x);
  }
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/
    React.createElement(MsgBlock, { state: this.state }), /*#__PURE__*/
    React.createElement("div", { class: "btns" }, /*#__PURE__*/
    React.createElement(TwitterButton, { state: this.state }), /*#__PURE__*/
    React.createElement(NewQuoteButton, { onClick: this.getQuote })));


  }}
;

ReactDOM.render( /*#__PURE__*/React.createElement(QuoteBlock, null), document.getElementById('quote-box'));