import React, {Component} from 'react';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein ) {
  return { name, calories, fat, carbs, protein};
}

const rows = [
  createData("Games Played:", 159, 6.0, 24, 4.0),
  createData("Points Averaged:", 237, 9.0, 37, 4.3),
  createData("Rebounds Averaged:", 262, 16.0, 24, 6.0),
  createData("Assists Averaged", 305, 3.7, 67, 4.3),
];


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
       left: '40%',
       
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
     <div>
       
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>



     </div>
    </div>
  );
}
}
export default App;