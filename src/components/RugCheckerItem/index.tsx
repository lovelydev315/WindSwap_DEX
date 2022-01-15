import React, { useCallback, useState } from 'react'
import { HelpCircle as Question } from 'react-feather'
import styled from 'styled-components'
import Tooltip from '../Tooltip'

const Item = styled.div`
  margin-bottom: 0.5rem !important;
  font-weight: 400;
`

const Title = styled.b`
  font-weight: bolder;
  font-size: 1rem;
  font-family: Poppins;
`

interface RugChekerItemProps {
  title: string
  description: string | number | boolean
  linebreak: boolean
}

export default function RugcheckerItem({ title, description, linebreak = false }: RugChekerItemProps) {
  return (
    <Item>
      {title && <Title>{title} : &nbsp; </Title>} {linebreak && <br />} {description.toString()}
    </Item>
  )
}
