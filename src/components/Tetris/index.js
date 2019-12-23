import React, { useState } from 'react'
import { createStage, checkCollision } from '../../util/gameHelpers'

import { useInterval } from '../../hooks/useInterval'
import { usePlayer } from '../../hooks/usePlayer'
import { useStage } from '../../hooks/useStage'
import { useGameStatus } from '../../hooks/useGameStatus'

import Stage from '../Stage'
import Display from '../Display'
import StartButton from '../StartButton'

import { StyledTetrisWrapper, StyledTetris } from './Tetris.styled'

const LEFT_ARROW_KEY = 37
const TOP_ARROW_KEY = 38
const RIGHT_ARROW_KEY = 39
const BOTTOM_ARROW_KEY = 40

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const [player, updatePlayerPosition, resetPlayer, playerRotate] = usePlayer()
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer)
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared)

  console.log('re-render')

  const movePlayer = direction => {
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      updatePlayerPosition({ x: direction, y: 0 })
    }
  }

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1))
      }
    }
  }

  const startGame = () => {
    // Reset everything
    setStage(createStage())
    setDropTime(1000)
    resetPlayer()
    setScore(0)
    setLevel(0)
    setRows(0)
    setGameOver(false)
  }

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1)
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200)
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPosition({ x: 0, y: 1, collided: false })
    } else {
      // Game over!
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!')
        setGameOver(true)
        setDropTime(null)
      }
      updatePlayerPosition({ x: 0, y: 0, collided: true })
    }
  }

  const dropPlayer = () => {
    // We don't need to run the interval when we use the arrow down to
    // move the tetromino downwards. So deactivate it for now.
    setDropTime(null)
    drop()
  }

  // Starts the game
  useInterval(() => {
    drop()
  }, dropTime)

  const move = ({ keyCode }) => {
    if (gameOver) {
      return
    }

    const makeMove = {
      [LEFT_ARROW_KEY]: () => movePlayer(-1),
      [RIGHT_ARROW_KEY]: () => movePlayer(1),
      [BOTTOM_ARROW_KEY]: () => dropPlayer(),
      [TOP_ARROW_KEY]: () => playerRotate(stage, 1),
    }

    if (!makeMove[keyCode]) {
      return
    }

    makeMove[keyCode]()
  }

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris
