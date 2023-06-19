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
export async function signString(data: string): Promise<string> {
  const provider = getTonProvider()

  return provider.send('ton_personalSign', {
    data,
  })
}
