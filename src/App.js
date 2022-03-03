import React, {Component} from 'react';
import axios from "axios";
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      playerName: null,
      playerStats: {}
    }
  }

handleSubmit = (e) => {
  e.preventDefault();
  this.getPlayerId()
  console.log(this.state.playerName)
}

handleChange = (event) => {
  const replace = event.target.value.split(" ").join("_");
  if(replace.length > 0){
    this.setState({playerName: replace})
  } else {
    alert("Please type players name!")
  }
}

  getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
    .then(async res => {
      // console.log(res.data.data)
      if(res.data.data[0] === undefined){
        alert("This player is either injured or hasn't played yet!")
      } else if(res.data.data.length > 1){
        alert("Pleases specify the name more!")
      } else{
        await this.getPlayerStats(res.data.data[0].id)

      }
    }).catch(err => {
      console.log(err)
    })
  }

  getPlayerStats = (playerId) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2006&player_ids[]=${playerId}`)
    .then(async res => {
      console.log(res.data.data)
      this.setState({ playerStats: res.data.data[0]})
    }).catch(err => {
      console.log(err)
    })
  }

  render(){
  return (
    <div className="App">

    <img src='https://teamworxteambuilding.com/wp-content/uploads/2018/08/nba-logo-72dpi.jpg'
    style={{
        height: '80%',
        width: '80%',
        position: 'relative',
        top: '-5px',
        left: '10%'}}/>

     <form onSubmit={this.handleSubmit}
     style={{
       position: 'relative',
       left: '38%',
     }}>
       <label>
         Name
         <input 
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="please enter players name"
         />
       </label>
       <input type="submit" value="Submit"/>
     </form>

     <table>
       <thead>
         <tr>
           <th>Total Games Played </th>
           <th>Points Per Game</th>
           <th>Rebounds Per Game</th>
           <th>Assists Per Game</th>
           <th>Steals Per Game</th>
           <th>Blocks Per Game</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td>{this.state.playerStats["games_played"]}</td>
           <td>{this.state.playerStats["pts"]}</td>
           <td>{this.state.playerStats["reb"]}</td>
           <td>{this.state.playerStats["ast"]}</td>
           <td>{this.state.playerStats["stl"]}</td>
           <td>{this.state.playerStats["blk"]}</td>
         </tr>
       </tbody>
     </table>

     <table>
       <thead>
         <tr>
           <th>Field Goals Attempted (per game)</th>
           <th>Field Goals Made</th>
           <th>Free Throws Attempted</th>
           <th>Free Throws Made</th>
           <th>Offensive Rebounds</th>
           <th>Defensive Rebounds</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td>{this.state.playerStats["fga"]}</td>
           <td>{this.state.playerStats["fgm"]}</td>
           <td>{this.state.playerStats["fta"]}</td>
           <td>{this.state.playerStats["ftm"]}</td>
           <td>{this.state.playerStats["oreb"]}</td>
           <td>{this.state.playerStats["dreb"]}</td>
         </tr>
       </tbody>
     </table>
     
    </div>
  );
}
}
export default App;