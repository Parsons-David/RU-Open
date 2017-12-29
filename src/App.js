import React, { Component } from 'react';
import './App.css';
import times_json from './12018_NB_U.json'
import { Chart } from 'react-google-charts';

class App extends Component {
  render() {
    return (
      <div>
      <Timeline/>
      </div>
    );
  }
}

// function get_and_parse_json(){
//   var resp = await fetch('https://raw.githubusercontent.com/Parsons-David/Rutgers-Course-API/master/data/12018_NB_U.json'); // Call the fetch function passing the url of the API as a parameter
//   var json = await resp.json();
//   console.log(json['M']);
//   return [];
// }

class Timeline extends Component {
  constructor(props){
    super(props);
    var today_times = times_json['times']['M'];
    var times = [];
    for(var i = 0; i < today_times.length; i++){
      var time_json = today_times[i];
      var new_time = [time_json['room'], time_json['course_name']];
      new_time.push(new Date(0, 0, 0, parseInt(time_json['start'].split(':')[0], 10), parseInt(time_json['start'].split(':')[1], 10), 0));
      new_time.push(new Date(0, 0, 0, parseInt(time_json['end'].split(':')[0], 10), parseInt(time_json['end'].split(':')[1], 10), 0));
      times.push(new_time);
    }
    console.log(times);
    this.state = {
      rowData : times
    }
  }
  render(){
    return(
      <div>
        <h1>Rutgers University Spring 2018 Monday Classes</h1>
        <p>Work in progress....</p>
        <Chart
        chartType = "Timeline"
        columns = {[
          {"id":"Room","type":"string"},
          {"id":"Course Name", "type":"string"},
          {"id":"Start","type":"date"},
          {"id":"End","type":"date"}
        ]}
        rows= {this.state.rowData}
        options = {{
          timeline:{
            colorByRowLabel:true,
            showBarLabels:true,
            barLabelStyle: {fontName: 'Helvetica', fontSize: 8, color: '#603913' }
          }
        }}
        graph_id = "TimelineChart"
        width={"100%"}
        height={"100%"}
        chartEvents={this.chartEvents}
        chartPackages={['timeline']}/>
      </div>
    );
  }
}

export default App;
