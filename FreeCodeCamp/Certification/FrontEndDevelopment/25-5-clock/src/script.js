import React from 'https://esm.sh/react';
import ReactDOM from 'https://esm.sh/react-dom';
import { Provider, connect } from 'https://esm.sh/react-redux'
import { createStore, combineReducers, applyMiddleware } from 'https://esm.sh/redux'

const ClockApp = function() {
  
  const TIME_FRAME = 1000; //ms
  
  const TIMER_LABELS = {
    BREAK: 'Break',
    SESSION: 'Session'
  }
  
  const defaultState = {
    breakLength: 5, //minutes
    sessionLength: 25, //minutes
    //breakLength: 1, //minutes
    //sessionLength: 1, //minutes
    timerLabel: TIMER_LABELS.SESSION
  };
  
  /* enum */
  const ACTS = {
    PLAY: 'start_stop',
    RESET: 'reset',
    UPDATE: 'update'
  };
  
  const PROCS = {
    start_stop: state => startStop(state),
    reset: () => reset(),
    'break-increment': state => increment(state, 'breakLength'),
    'session-increment': state => increment(state, 'sessionLength'),
    'break-decrement': state => decrement(state, 'breakLength'),
    'session-decrement': state => decrement(state, 'sessionLength'),
    update: state => timerDecrement(state)
  };
  
  const startStop = state => {
    const started = state.running === undefined;
    let running = !state.running;
    const o = Object.assign({}, state);
    o.running = running;
    updateEvent(o);
    return o
  };
  
  const reset = () => {
    beep(true);
    return defaultState
  };
  
  const updateEvent = state => {
    if (state.running) {
      setTimeout(()=>store.dispatch({ type: ACTS.UPDATE }), TIME_FRAME);
    }
  };
  
  const timerDecrement = (state) => {  
    
    let st = Object.assign({}, state)
    
    if (!st.running){
      return state
    }
    let timer = getTimerLeft(st);
    timer--;
    if (timer < 0){      
      beep();
      if (state.timerLabel === TIMER_LABELS.SESSION){
        st.timerLabel = TIMER_LABELS.BREAK;
        timer = state.breakLength * 60;
      }
      else {
        st.timerLabel = TIMER_LABELS.SESSION;
        timer = state.sessionLength * 60;
      }
    }
    st.timerLeft = timer;
    
    updateEvent(st);
    
    return st
  };
  
  const beep = (off) => {
    const x = document.getElementById('beep');
    if (off) {
      x.pause();
      x.currentTime = 0
    }
    else {
      x.play();
    }
  };
  
  const increment = (state, k) => changeValue(state, k, 60, true);
  
  const decrement = (state, k) => changeValue(state, k, 1, false);
  
  const changeValue = (state, k, lim, up, d = 1) => {
    if (state.running){
      return state
    }
    const v = (state[k] || 0) + (up ? d : -d);
    if (
        (up && v > lim) ||
        (!up && v < lim)
      ) {
      return state
    }
    const o = Object.assign({}, state);
    o[k] = v;
    return o
  };
  
  const getTimerLeft = (state) => {
      return state.timerLeft===undefined ?
        state.sessionLength * 60 :
        state.timerLeft
  };
    
  const buildBtn = (act, nm, parent, cs) => {
    return (
      <button id={act} class={cs} onClick={parent.props.handleEvent}>{nm}</button>
    )
  };

  class ConfigBlock extends React.Component {
    constructor(props)  {
      super(props)
    }
    
    BuildBlock(id, nm, len) {
      
      const key = x => [id,x].join('-');
      
      return (
        <div class="ConfigBlockSub">
          <div id={key('label')}>{nm}</div>
          <div>
            {buildBtn(key('decrement'), '-', this)}
            <div id={key('length')}>{len}</div>
            {buildBtn(key('increment'), '+', this)}
          </div>
        </div>
      )
    }
    
    render(){
      return (
      <div class="ConfigBlock">
          {this.BuildBlock('break', 'Break Length', this.props.state.breakLength)}
          {this.BuildBlock('session', 'Session Length', this.props.state.sessionLength)}
      </div>
    )}
  }

  class CounterBlock extends React.Component {
    constructor(props)  {
      super(props)
    }
    render(){      
      const timer = getTimerLeft(this.props.state);
      
      const fmtTm = ()=>{
        const fmt = (v)=>{
          v = String(v);
          return v.length === 1 ? '0'+ v : v
        };
        return [
          fmt(Math.floor(timer/60)),
          fmt(timer%60)
        ].join(':')
      };
      
      return (
      <div class="timer-block">
          <div id='timer-label'>{this.props.state.timerLabel}</div>
          <div id='time-left' class={(timer < 60 ? 'timeLeftWarn' : 'timeLeftSession')}>{fmtTm()}</div>
      </div>
    )}
  }

  class ControlBlock extends React.Component {
    constructor(props)  {
      super(props)
    }
    
    render(){
      const running = this.props.state.running;
      return (
      <div class="ControlBlock">
          {buildBtn(ACTS.PLAY, running ? 'Stop' : 'Play', this, running ? 'stop' : 'start')}
          {buildBtn(ACTS.RESET, 'Reset', this, 'reset')}
      </div>
    )}
  }

  class ClockBlock extends React.Component {
    constructor(props){
      super(props);
      this.state = defaultState;
      this.handleEvent = this.handleEvent.bind(this);
    }
    handleEvent(e){
      this.props.handleEvent(e);
    }
    render(){
      return (
        <div>
          <ConfigBlock handleEvent={this.handleEvent} state={this.props} />
          <CounterBlock state={this.props} />
          <ControlBlock handleEvent={this.handleEvent} state={this.props}/>
        </div>
      )
    }
  }
  
  const reducer = (state = defaultState, action) => {
    const proc = PROCS[action.type];
    let r = null;
    if (proc){
      r = proc(state);
      if (r!==null){
        return r
      }
    }
    return state
  };

  const store = createStore(reducer);

  const build = htmlParentID => {
    
    const mapStateToProps = (state) => {
      return state
    };

    const mapDispatchToProps = (dispatch) => {
      return {
        handleEvent: (e) => dispatch({ type:e.target.id })
      }
    };

    const Container = connect(mapStateToProps, mapDispatchToProps)(ClockBlock);
    
    ReactDOM.render(
      <Provider store={store}>
        <Container/>
      </Provider>,
      document.getElementById(htmlParentID)
    );
  };
  
  return {
    build: build
  }
}();

ClockApp.build('clock-box');
