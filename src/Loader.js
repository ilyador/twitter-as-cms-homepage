import React, { Component } from 'react'
import injectSheet from 'react-jss'
import classnames from 'classnames'



const letter = 'A'
const times = 5

const styles = theme => {
  const getLetterClasses = (items) => {
    let list = {}
    for (let i = 0; i < items; i++) {
      list[`&-${i}`] = {
        left: 20 * i
      }
    }
    return list
  }

  return {
    letter: {
      position: 'absolute',
      ...getLetterClasses(times),
    },
    spinWrapper: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
  }
}


class Loader extends Component {

  render () {
    const { classes } = this.props
    const spinner_array = Array(times).fill(letter)

    const spinner = spinner_array.map((letter, i) => {
      const cls = classnames(classes.letter, `${classes.letter}-${i}`)
      return <div className={cls} key={i}>{letter}</div>
    })

    return (
      <div className={classes.spinWrapper}>{spinner}</div>
    )
  }
}


export default injectSheet(styles)(Loader)
