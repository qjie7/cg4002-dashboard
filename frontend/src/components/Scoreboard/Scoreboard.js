// import React from 'react'
// import { ReactDom } from 'react-router-dom'
// import PropTypes from 'prop-types'
// import './Scoreboard.css'

// const AddPlayerForm = ({ addPlayer }) => {
//   let playerInput = React.createRef()

//   let handleSubmit = (e) => {
//     e.preventDefault()
//     addPlayer(playerInput.current.value)
//     e.currentTarget.reset()
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type='text' placeholder='Enter a player name' ref={playerInput} />
//       <input type='submit' value='Add Player' />
//     </form>
//   )
// }

// AddPlayerForm.propTypes = {
//   addPlayer: PropTypes.func,
// }
// export default class Scoreboard extends React.Component {
//   state = {
//     players: [
//       {
//         name: 'Johnny Rose',
//         score: 0,
//         id: 1,
//       },
//       {
//         name: 'Moira Rose',
//         score: 0,
//         id: 2,
//       },
//       {
//         name: 'David Rose',
//         score: 0,
//         id: 3,
//       },
//       {
//         name: 'Alexis Rose',
//         score: 0,
//         id: 4,
//       },
//     ],
//   }

//   prevPlayerId = 4

//   handleScoreChange = (index, delta) => {
//     this.setState((prevState) => ({
//       score: (prevState.players[index].score += delta),
//     }))
//   }

//   highestScore = () => {
//     // const hello = Math.max.apply(Math, this.state.players.map(o => o.score))
//     //const hello = Math.max(...this.state.players.map(o => o.score), 0);
//     const hello = this.state.players.reduce((current, prev) =>
//       current.score > prev.score ? current : prev
//     ).score
//     if (hello) {
//       return hello
//     }
//   }

//   handleAddPlayer = (name) => {
//     this.setState((prevState) => {
//       return {
//         players: [
//           ...prevState.players,
//           {
//             name,
//             score: 0,
//             id: (this.prevPlayerId += 1),
//           },
//         ],
//       }
//     })
//   }

//   handleRemovePlayer = (id) => {
//     this.setState((prevState) => {
//       return {
//         players: prevState.players.filter((p) => p.id !== id),
//       }
//     })
//   }

//   render() {
//     const highScore = this.highestScore()

//     return (
//       <div className='scoreboard'>
//         <Header players={this.state.players} />,
//         {this.state.players.map((player, index) => (
//           <Player
//             name={player.name}
//             score={player.score}
//             index={index}
//             key={player.id.toString()}
//             removePlayer={this.handleRemovePlayer}
//             id={player.id}
//             changeScore={this.handleScoreChange}
//             isHighScore={highScore === player.score} // is a player's 'score' prop equal to the high score?
//           />
//         ))}
//         <AddPlayerForm addPlayer={this.handleAddPlayer} />
//       </div>
//     )
//   }
// }
// const Counter = ({ index, changeScore, score }) => {
//   return (
//     <div className='counter'>
//       <button
//         className='counter-action decrement'
//         onClick={() => changeScore(index, -1)}
//       >
//         {' '}
//         -{' '}
//       </button>
//       <span className='counter-score'>{score}</span>
//       <button
//         className='counter-action increment'
//         onClick={() => changeScore(index, +1)}
//       >
//         {' '}
//         +{' '}
//       </button>
//     </div>
//   )
// }

// Counter.propTypes = {
//   index: PropTypes.number,
//   score: PropTypes.number,
//   changeScore: PropTypes.func,
// }
// const Header = ({ title, players }) => {
//   return (
//     <header>
//       <Stats players={players} />
//       <h1>{title}</h1>
//       <Stopwatch />
//     </header>
//   )
// }

// Header.propTypes = {
//   title: PropTypes.string,
//   players: PropTypes.arrayOf(PropTypes.object),
// }

// Header.defaultProps = {
//   title: 'Scoreboard',
// }
// const Icon = (props) => {
//   return (
//     <svg
//       viewBox='0 0 44 35'
//       className={props.isHighScore ? 'is-high-score' : null}
//     >
//       <path
//         d='M26.7616 10.6207L21.8192 0L16.9973 10.5603C15.3699 14.1207 10.9096 15.2672 7.77534 12.9741L0 7.24138L6.56986 28.8448H37.0685L43.5781 7.72414L35.7425 13.0948C32.6685 15.2672 28.3288 14.0603 26.7616 10.6207Z'
//         transform='translate(0 0.301727)'
//       />
//       <rect
//         width='30.4986'
//         height='3.07759'
//         transform='translate(6.56987 31.5603)'
//       />
//     </svg>
//   )
// }

// Icon.propTypes = {
//   isHighScore: PropTypes.bool,
// }
// class Player extends React.PureComponent {
//   static propTypes = {
//     changeScore: PropTypes.func,
//     removePlayer: PropTypes.func,
//     name: PropTypes.string.isRequired,
//     id: PropTypes.number.isRequired,
//     score: PropTypes.number,
//     index: PropTypes.number,
//     isHighScore: PropTypes.bool,
//   }

//   render() {
//     const { name, id, score, index, removePlayer, changeScore } = this.props
//     return (
//       <div className='player'>
//         <span className='player-name'>
//           <button className='remove-player' onClick={() => removePlayer(id)}>
//             ✖
//           </button>

//           <Icon isHighScore={this.props.isHighScore} />

//           {name}
//         </span>

//         <Counter score={score} changeScore={changeScore} index={index} />
//       </div>
//     )
//   }
// }
// const Stats = ({ players }) => {
//   const totalPlayers = players.length
//   const totalPoints = players.reduce((total, player) => {
//     return total + player.score
//   }, 0)

//   return (
//     <table className='stats'>
//       <tbody>
//         <tr>
//           <td>Players:</td>
//           <td>{totalPlayers}</td>
//         </tr>
//         <tr>
//           <td>Total Points:</td>
//           <td>{totalPoints}</td>
//         </tr>
//       </tbody>
//     </table>
//   )
// }

// Stats.propTypes = {
//   players: PropTypes.arrayOf(
//     PropTypes.shape({
//       score: PropTypes.number,
//     })
//   ),
// }
// class Stopwatch extends React.Component {
//   static propTypes = {
//     isRunning: PropTypes.bool,
//     elapsedTime: PropTypes.number,
//     previousTime: PropTypes.number,
//   }

//   constructor() {
//     super()
//     this.state = {
//       isRunning: false,
//       elapsedTime: 0,
//       previousTime: 0,
//     }
//   }

//   componentDidMount() {
//     this.intervalID = setInterval(() => this.tick(), 100)
//   }

//   componentWillUnmount() {
//     clearInterval(this.intervalID)
//   }

//   tick = () => {
//     if (this.state.isRunning) {
//       const now = Date.now()
//       this.setState((prevState) => ({
//         previousTime: now,
//         elapsedTime: prevState.elapsedTime + (now - this.state.previousTime),
//       }))
//     }
//   }

//   handleStopWatch = () => {
//     this.setState((prevState) => ({
//       isRunning: !prevState.isRunning,
//     }))
//     if (!this.state.isRunning) {
//       this.setState({
//         previousTime: Date.now(),
//       })
//     }
//   }

//   handleReset = () => {
//     this.setState({
//       elapsedTime: 0,
//     })
//   }

//   render() {
//     const seconds = Math.floor(this.state.elapsedTime / 1000)
//     return (
//       <div className='stopwatch'>
//         <h2>Stopwatch</h2>
//         <span className='stopwatch-time'>{seconds}</span>
//         <button onClick={this.handleStopWatch}>
//           {' '}
//           {this.state.isRunning ? 'Stop' : 'Start'}
//         </button>
//         <button onClick={this.handleReset}>Reset</button>
//       </div>
//     )
//   }
// }
