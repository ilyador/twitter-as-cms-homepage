import { Component } from 'react'
import PropTypes from 'prop-types'


class Delay extends Component {
  static propTypes = {
    children: PropTypes.node,
    wait: PropTypes.number
  }

  static defaultProps = { wait: 250 }

  state = { waiting: true }

  componentDidMount () {
    this.timer = window.setTimeout(() => {
      this.setState({ waiting: false })
    }, this.props.wait)
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  render () {
    return (!this.state.waiting) ? this.props.children : null
  }
}


export default Delay
