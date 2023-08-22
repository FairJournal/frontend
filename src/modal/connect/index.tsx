import React from 'react'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export type ConnectModalProps = {
  handleClose: () => void
}

const ConnectModal: React.FC<ConnectModalProps> = ({ handleClose }: ConnectModalProps) => {
  return (
    <Dialog open={true} onClose={handleClose}>
      <div style={{ padding: '20px' }}>
        <h2>Connect via OpenMask</h2>
        <p>
          To use the site, please install{' '}
          <a href="https://www.openmask.app/" target="_blank" rel="noopener noreferrer">
            OpenMask
          </a>
          .
        </p>
        <Button variant="contained" color="secondary" onClick={handleClose}>
          Close
        </Button>
        <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px', fontSize: '12px' }}>
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
      </div>
    </Dialog>
  )
}

export default ConnectModal
