export const shortenString = (str: string | null): string => {
  if (!str) return ''

  if (str.length <= 10) {
    return str
  }
  const firstFive = str.substring(0, 5)
  const lastFive = str.substring(str.length - 5)

  return `${firstFive}...${lastFive}`
}

export const base64ToBlob = (base64String: string, type = 'image/png') => {
  const byteString = atob(base64String.split(',')[1])
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ab], { type })
}
