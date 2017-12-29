import React, { Component } from 'react';
import './App.css';
import times_json from './12018_NB_U.json'
import { Chart } from 'react-google-charts';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      day : 'M',
      display_day : 'Monday'
    }
  }
  changeDay(new_day){
    var days = {
      "U" : "Sunday",
      "M" : "Monday",
      "T" : "Tuesday",
      "W" : "Wednesday",
      "TH" : "Thursday",
      "F" : "Friday",
      "S" : "Saturday"
    }
    this.setState({
      day:new_day,
      display_day: days[new_day]
    })
  }
  render() {
    console.log("Rendering: " + this.state.day);
    return (
      <div>
        <h1>Rutgers University Spring 2018 {this.state.display_day} Classes</h1>
        <div className="days">
          <button onClick={()=>this.changeDay("U")}>Sunday</button>
          <button onClick={()=>this.changeDay("M")}>Monday</button>
          <button onClick={()=>this.changeDay("T")}>Tuesday</button>
          <button onClick={()=>this.changeDay("W")}>Wednesday</button>
          <button onClick={()=>this.changeDay("TH")}>Thursday</button>
          <button onClick={()=>this.changeDay("F")}>Friday</button>
          <button onClick={()=>this.changeDay("S")}>Saturday</button>
        </div>
        <hr/>
        <Timeline day={this.state.day}/>
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
  render(){
    var today_times = times_json['times'][this.props.day];
    var times = [];
    for(var i = 0; i < today_times.length; i++){
      var time_json = today_times[i];
      // console.log(time_json[2].split(':'));
      var new_time = [time_json[0], time_json[1]];
      new_time.push(new Date(0, 0, 0, parseInt(time_json[2].split(':')[0], 10), parseInt(time_json[2].split(':')[1], 10), 0));
      new_time.push(new Date(0, 0, 0, parseInt(time_json[3].split(':')[0], 10), parseInt(time_json[3].split(':')[1], 10), 0));
      times.push(new_time);
    }
    console.log(times);
    return(
      <div>
        <Chart
        chartType = "Timeline"
        columns = {[
          {"id":"Room","type":"string"},
          {"id":"Course Name", "type":"string"},
          {"id":"Start","type":"date"},
          {"id":"End","type":"date"}
        ]}
        rows={times}
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
