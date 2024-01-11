import ReactDOM from "https://esm.sh/react-dom";
import "https://cdnjs.cloudflare.com/ajax/libs/marked/11.1.1/marked.min.js";

const defaultState = { 
  text: `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff: 

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`
};

const buildBox = (key, tit, child) => {
  return (
    <div class={"box " + key}>
      <div>{tit}</div>
      <div>{child}</div>
    </div>
  )
    
}

class EditorBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return buildBox(
        'box-editor',
        'Editor',(<p>
        <textarea id="editor" value={this.props.text} onChange={this.props.onChange}></textarea></p>)
      );
  }
}

class PreviewerBox extends React.Component {
  constructor(props) {
    super(props);
  }
  
  parseText(txt){
    return {
      __html: marked.parse(txt, {breaks: true})
    };
  }
  
  render(){
    
    return buildBox(
      'box-previewer',
      'Previewer', 
      <div id="preview" dangerouslySetInnerHTML={this.parseText(this.props.text)} />
    );
  }
}

class MainBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    this.setState({
      text: e.target.value
    })
  }
  render(){
    return (<div>
        <EditorBox text={this.state.text} onChange={this.handleChange} />
        <PreviewerBox text={this.state.text}/>
      </div>);
  }
}

ReactDOM.render(<MainBox />, document.getElementById('main-box'));