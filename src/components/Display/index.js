import React from 'react'
import PropTypes from 'prop-types'
import { StyledDisplay } from './Display.styled'

const Display = ({ gameOver, text }) => <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>

Display.propTypes = {
  gameOver: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
}

export default Display
