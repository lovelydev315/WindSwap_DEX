import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import useTheme from 'hooks/useTheme'
import DarkModeSwap from './DarkModeSwap'
import LightModeSwap from './LightModeSwap'

const Swap = () => {
  const { isDark, toggleTheme } = useTheme();
  useEffect(() => {
    console.log("IS_DARK: ", localStorage.getItem("IS_DARK"))
  })
  return (
    <div>
      {isDark === true && <DarkModeSwap />}
      {isDark === false && <LightModeSwap />}
    </div>
  )
}

export default Swap
