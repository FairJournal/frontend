import Embed from '@editorjs/embed'
import List from '@editorjs/list'
import Code from '@editorjs/code'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import Paragraph from '@editorjs/paragraph'
import { uploadFile, uploadJsonFile } from '../../utils/fs'
import { hashToUrl } from '../../utils'

export const getEditorJsTools = () => {
  return {
    embed: Embed,
    header: Header,
    paragraph: {
      class: Paragraph,
      inlineStyle: 'style="font-size: 18px;"',
      inlineToolbar: true,
    },
    image: {
      class: Image,
      config: {
        uploader: {
          async uploadByFile(file: File) {
            try {
              if (file.size >= Number(process.env.REACT_APP_MAX_SIZE_FILE)) {
                throw new Error('Image size exceeds the limit of 10MB')
              }

              const res = await uploadFile(file)

              return {
                success: 1,
                file: {
                  url: hashToUrl(res.data.reference),
                },
              }
            } catch (error) {
              return {
                success: 0,
                error: 'Error uploading image',
              }
            }
          },
          async uploadByUrl(url: string) {
            try {
              // Implement your logic here to handle image upload by URL
              // You can use fetch or any other method to upload the image by URL

              const response = await fetch(url)
              const blob = await response.blob()
              const res = await uploadJsonFile(blob)

              return {
                success: 1,
                file: {
                  url: hashToUrl(res.data.reference),
                },
              }
            } catch (error) {
              return {
                success: 0,
                error: 'Error uploading image from URL',
              }
            }
          },
        },
      },
    },
    list: List,
    code: Code,
    delimiter: Delimiter,
    inlineCode: InlineCode,
  }
}
