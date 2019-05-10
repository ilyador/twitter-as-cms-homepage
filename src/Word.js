import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import injectSheet from 'react-jss'
import isUrl from 'is-url'
import classnames from 'classnames'


const transitionDuration = 3000

const styles = theme => ({
  word: {
    position: 'relative',
    margin: [0, theme.margin, theme.margin / 2, 0],
    display: 'inline-block',
    color: theme.colorDark,
    backgroundColor: theme.colorDark,
    paddingBottom: 3,
    userSelect: 'none',
    transition: [
      {
        property: 'background-color',
        duration: 5000,
        timingFunction: 'cubic-bezier(.87,-0.01,.93,-0.19)'
      },{
        property: 'left',
        duration: transitionDuration,
        timingFunction: 'cubic-bezier(0,1.16,1,.56)'
      }
    ],
    '&:hover, .touched': {
      transition: {
        property: 'background-color',
        duration: 200,
        timingFunction: 'ease'
      },
      background: 'none'
    }
  },
  wordTransitionAppear: {
    left: 1200
  },
  wordTransitionAppearActive: {
    left: 0
  }
})


class Word extends Component {

  state = {
    touched: false,
    transitionIn: true
  }

  onTouchStart = () => {
    this.setState({ touched: true })
  }

  onTouchEnd = () => {
    this.setState({ touched: false })
  }


  render () {
    const { classes, word } = this.props
    let clx = classnames(classes.word, { touched: this.state.touched })

    const wordElement = (isUrl(word)) ?
      <a className={clx}
         href={word}
         target="_blank">{word}</a>
      :
      <span className={clx}
            onTouchStart={this.onTouchStart}
            onTouchEnd={this.onTouchEnd}>{word}</span>

    return (
      <CSSTransition
        in={this.state.transitionIn}
        appear={true}
        timeout={transitionDuration}
        classNames={{
          appear: classes.wordTransitionAppear,
          appearActive: classes.wordTransitionAppearActive
        }}
      >
        {wordElement}
      </CSSTransition>
    )
  }
}


export default injectSheet(styles)(Word)