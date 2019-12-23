import React from 'react'
import PropTypes from 'prop-types'
import { TETROMINOS } from '../../util/tetrominos'
import { StyledCell } from './Cell.styled'

// React.memo makes sure we only re-render the changed cells
const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type].color}>
    {console.log('rerender cell')}
  </StyledCell>
)

Cell.propTypes = {
  type: PropTypes.string.isRequired,
}

export default React.memo(Cell)
