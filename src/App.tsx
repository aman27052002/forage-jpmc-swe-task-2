import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph:boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // Initialize state with an empty array for data
      data: [],
      showGraph:false,
    };
  }

  /**
   * Function to fetch data from server and update state with new data
   */
  getDataFromServer() {
    let x=0;
    const interval = setInterval(()=>{
        DataStreamer.getData((serverResponds:ServerRespond[])=>{
         this.setState({
         data:serverResponds,
         showGraph:true,
         })
        })
        x++;
        if(x>1000){
            clearInterval(interval)
        }
    },100)
  }

  /**
   * Function to start streaming data at an interval
   */

  /**
   * Render the Graph component with data passed as props
   */
  renderGraph() {
      if(this.state.showGraph){
         return <Graph data={this.state.data} />;
      }
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button
            className="btn btn-primary Stream-button"
            onClick={() => {
              this.getDataFromServer();
            }}
          >
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
