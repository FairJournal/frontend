/* eslint-disable no-console */
import { WindowWithTon } from './interfaces/window'

declare const window: WindowWithTon

/**
 * Ton provider
 */
export interface TonProvider {
  send: (method: string, params: any) => Promise<any>
}

/**
 * Checks that Ton extension is available
 */
export function isTonAvailable(): boolean {
  return typeof window.ton !== 'undefined' && window.ton
}

/**
 * Gets Ton provider
 */
export function getTonProvider(): TonProvider {
  if (!isTonAvailable()) {
    throw new Error('Please install and unlock Ton to use this feature.')
  }

  return window.ton
}

/**
 * Signs a string using Ton extension
 */
export async function personalSignString(data: string): Promise<string> {
  const provider = getTonProvider()

  return provider.send('ton_personalSign', {
    data,
  })
}

/**
 * Get public key from Ton extension
 */
export async function getPublicKey(): Promise<{ publicKey: string; address: string }> {
  const provider = getTonProvider()

  const response = await provider.send('ton_requestWallets', {})

  if (!response || !response.length) {
    throw new Error('Failed to request wallets')
  }

  const publicKey = response[0].publicKey
  const address = response[0].address

  if (!publicKey) {
    throw new Error('Failed to get public key from requested wallets')
  }

  return { publicKey, address }
}
