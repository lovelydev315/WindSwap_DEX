import React from 'react'
import styled from 'styled-components'
import { Flex, Text, Toggle, useMatchBreakpoints } from '@pancakeswap-libs/uikit'
import { useAudioModeManager } from 'state/user/hooks'

type AudioSettingModalProps = {
  translateString: (translationId: number, fallback: string) => string
}

const StyledSlippageToleranceSettings = styled.div`
  margin-bottom: 16px;
`

const AudioSetting = ({ translateString }: AudioSettingModalProps) => {
  const { isSm, isXs } = useMatchBreakpoints()
  const [audioPlay, toggleSetAudioMode] = useAudioModeManager()

  return (
    <StyledSlippageToleranceSettings>
      <Flex alignItems="center" mb="8px">
        <Text bold>{translateString(999, 'Audio')}</Text>
      </Flex>
      <Toggle checked={audioPlay} onChange={toggleSetAudioMode} />
    </StyledSlippageToleranceSettings>
  )
}

export default AudioSetting
