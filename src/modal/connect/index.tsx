import React from 'react'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'

export type ConnectModalProps = {
  handleClose: () => void
}

const ConnectModal: React.FC<ConnectModalProps> = ({ handleClose }: ConnectModalProps) => {
  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{'Connect via OpenMask'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="body1">
            To use the site, please install{' '}
            <a href="https://www.openmask.app/" target="_blank" rel="noopener noreferrer">
              OpenMask!
            </a>
          </Typography>
          <Typography variant="body1">
            OpenMask{' '}
            <a
              href="https://www.openmask.app/docs/api-reference/rpc-api#ton_personalsign"
              target="_blank"
              rel="noopener noreferrer"
            >
              allows
            </a>{' '}
            you to control changes on your personal file system without giving third-party access to make changes.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConnectModal
