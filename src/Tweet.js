import React, { Component } from 'react'
import injectSheet from 'react-jss'
import Word from './Word'
import Delay from './Delay'


const styles = theme => ({
  sentence: {
    marginBottom: theme.margin * 2,
    fontSize: theme.fontSize * 2
  }
})


class Tweet extends Component {

  render () {
    const { classes, text } = this.props
    const wordList = text.split(/\s+/)

    const sentence = wordList.map((word, i) =>
      <Delay wait={100 * i} key={i}>
        <Word word={word}/>
      </Delay>
    )

    return (
      <li className={classes.sentence}> {sentence}</li>
    )
  }
}

export default injectSheet(styles)(Tweet)