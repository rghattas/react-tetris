import React from 'react'
import PropTypes from 'prop-types'
import { StyledStage } from './Stage.styled'

import Cell from '../Cell'

const Stage = ({ stage }) => (
  <StyledStage width={stage[0].length} height={stage.length}>
    {stage.map(row => row.map(cell => <Cell key={`cell-${Math.random()}`} type={cell[0]} />))}
  </StyledStage>
)

Stage.propTypes = {
  stage: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
}

Stage.defaultProps = {
  stage: [],
}

export default Stage
