import React, { Component } from 'react'
import io from 'socket.io-client'
import Delay from './Delay'
import Tweet from './Tweet'
import Loader from './Loader'
import injectSheet from 'react-jss'

import './App.css'


const styles = theme => ({
  container:{
    maxWidth: 960,
    margin: [0, 'auto']
  },
  tweetList: {
    margin: theme.margin * 2
  }
})


class App extends Component {
  state = { tweetList: [] }


  componentDidMount () {
    const socket = io('http://localhost:5000')
    // const socket = io('https://ilyothehorrid-twitter.herokuapp.com')
    socket.on('tweetList', data => this.setState({ tweetList: data.tweets }))
    // socket.on('liveTweet', data => this.setState({ liveTweet: data.tweet }))
  }


  render () {
    const { classes } = this.props;

    const tweetList = this.state.tweetList.map((tweet, i) =>
      <Delay wait={200 * i} key={i}>
        <Tweet text={tweet}/>
      </Delay>
    )

    return (
      <div className={classes.container}>
        <ul className={classes.tweetList}>
          {tweetList}
        </ul>
      </div>
    )
  }
}


export default injectSheet(styles)(App)
