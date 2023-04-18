/* eslint-disable no-console */
import { Container } from '@mui/material'
import Output from 'editorjs-react-renderer'
import React from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../../components/header'
import { useAppSelector } from '../../store/hooks'
import { selectMain } from '../../store/slices/mainSlice'

export const RenderArticle = () => {
  const { profile, current } = useAppSelector(selectMain)

  const { wallet, hash } = useParams()
  const data = current[0]

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Output data={data} />
      </Container>
    </>
  )
}
