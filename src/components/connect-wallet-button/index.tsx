import Button, { ButtonProps } from '@mui/material/Button'
import React, { useState } from 'react'
import { getPublicKey, isOpenMask } from '../../utils/ton'
import { getUserInfo } from '../../api/users'
import { createUser } from '../../utils/fs'
import { login } from '../../store/slices/mainSlice'
import ConnectModal from '../../modal/connect'
import { useAppDispatch } from '../../store/hooks'

export type ConnectWalletProps = ButtonProps

export const ConnectWalletButton: React.FC<ConnectWalletProps> = props => {
  const dispatch = useAppDispatch()
  const [openModal, setOpenModal] = useState(false)

  const connectWallet = async () => {
    if (!isOpenMask()) {
      setOpenModal(true)

      return
    }

    try {
      // if (tonConnectUI.connected) {
      //   await tonConnectUI.disconnect()
      // }
      // await tonConnectUI.connectWallet()
      const { publicKey, address } = await getPublicKey()
      const userInfo = await getUserInfo(publicKey)

      if (!userInfo.isUserExists) {
        await createUser(publicKey)
      }

      dispatch(
        login({
          wallet: address,
          publickey: publicKey,
        }),
      )
    } catch (e) {
      console.error(e)

      return
    }
  }

  return (
    <>
      <Button onClick={connectWallet} variant={props.variant} color={props.color}>
        Connect wallet
      </Button>
      {openModal && <ConnectModal handleClose={() => setOpenModal(false)} />}
    </>
  )
}
