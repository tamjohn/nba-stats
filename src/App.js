import React, {Component} from 'react';
import axios from "axios";
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      playerName: null,
      seasonYear: null,
      playerStats: {},
    }
  }

handleSubmit = (e) => {
  e.preventDefault();
  this.getPlayerId()
  console.log(this.state.playerName)
  console.log(this.state.seasonYear)
}

handleChange = (event) => {
  const replace = event.target.value.split(" ").join("_");
  if(replace.length > 0){
    this.setState({playerName: replace})
  } else {
    alert("Please type players name!")
  }
}

handleChange2 = (event) => {
  console.log(event.target.value);
  this.setState({
    seasonYear: event.target.value
  })
}

  getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
    .then(async res => {
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
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${this.state.seasonYear}&player_ids[]=${playerId}`)
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
       left: '30%',
       justifyContent: 'space'
     }}>

       <div>
         <label> Name </label>
         <input
          name = "Name"
          placeholder="please enter players name"
          type="text"
          value={this.state.playerName}
          onChange={this.handleChange}
          />
       </div>
       <div>
       <label> Season </label>
         <input
          name = "Season"
          placeholder="please enter the season"
          type="number"
          value={this.state.seasonYear}
          onChange={this.handleChange2}
          />
       </div>
         <input type="submit" value="Submit"/>
       </form>

     <table>
       <thead>
         <tr>
           <th>Total Games Played</th>
           <th>Minutes Played Per Game</th>
           <th>Points Per Game</th>
           <th>Rebounds Per Game</th>
           <th>Offensive Rebounds Per Game</th>
           <th>Defensive Rebounds Per Game</th>
           <th>Assists Per Game</th>
           <th>Steals Per Game</th>
           <th>Blocks Per Game</th>
           <th>Turnovers Per Game</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td>{this.state.playerStats["games_played"]}</td>
           <td>{this.state.playerStats["min"]}</td>
           <td>{this.state.playerStats["pts"]}</td>
           <td>{this.state.playerStats["reb"]}</td>
           <td>{this.state.playerStats["oreb"]}</td>
           <td>{this.state.playerStats["dreb"]}</td>
           <td>{this.state.playerStats["ast"]}</td>
           <td>{this.state.playerStats["stl"]}</td>
           <td>{this.state.playerStats["blk"]}</td>
           <td>{this.state.playerStats["turnover"]}</td>
         </tr>
       </tbody>
     </table>

     <table>
       <thead>
         <tr>
           <th>Field Goals Attempted per game</th>
           <th>Field Goals Made per game</th>
           <th>Season Field Goal %</th>
           <th>Three Pointers Attempted per game</th>
           <th>Three Pointers made per game</th>
           <th>Season Three Point %</th>
           <th>Free Throws Attempted per game</th>
           <th>Free Throws Made per game</th>
           <th>Season Free Throw %</th>
           <th>Fouls per game</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td>{this.state.playerStats["fga"]}</td>
           <td>{this.state.playerStats["fgm"]}</td>
           <td>{this.state.playerStats["fg_pct"]}</td>
           <td>{this.state.playerStats["fg3a"]}</td>
           <td>{this.state.playerStats["fg3m"]}</td>
           <td>{this.state.playerStats["fg3_pct"]}</td>
           <td>{this.state.playerStats["fta"]}</td>
           <td>{this.state.playerStats["ftm"]}</td>
           <td>{this.state.playerStats["ft_pct"]}</td>
           <td>{this.state.playerStats["pf"]}</td>
         </tr>
       </tbody>
     </table>
     
    </div>
  );
}
}
export default App;