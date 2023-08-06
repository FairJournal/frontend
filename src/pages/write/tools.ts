/* eslint-disable no-console */
import Embed from '@editorjs/embed'
import List from '@editorjs/list'
import Code from '@editorjs/code'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import Paragraph from '@editorjs/paragraph'
import { uploadFile } from '../../utils/fs'

export const getEditorJsTools = (authorId: number) => {
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
            const res = await uploadFile(file)

            return {
              success: 1,
              file: {
                url: `https://api.fairjournal.net/ton/${res.data.reference.toUpperCase()}/blob`,
              },
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
