import Embed from '@editorjs/embed'
import List from '@editorjs/list'
import Code from '@editorjs/code'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import Paragraph from '@editorjs/paragraph'
import { uploadFile } from '../../utils/fs'
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
            const res = await uploadFile(file)

            return {
              success: 1,
              file: {
                url: hashToUrl(res.data.reference),
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
