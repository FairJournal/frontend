import React, { useContext } from 'react'
import { Update } from '@fairjournal/file-system'

export const UpdateContext = React.createContext<Update | undefined>(undefined)

/**
 * Provides update file system instance
 */
export function useFsUpdate() {
  const context = useContext(UpdateContext)

  if (context === undefined) {
    throw new Error('useFsUpdate must be used within a MyContext.Provider')
  }

  return context
}
