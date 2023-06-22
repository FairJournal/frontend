import Embed from '@editorjs/embed'
import List from '@editorjs/list'
import Code from '@editorjs/code'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import Paragraph from '@editorjs/paragraph'

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
            const formData = new FormData()
            formData.append('image', file)
            formData.append('authorId', authorId.toString())

            return await (
              await fetch(`${process.env.REACT_APP_URL_API}api/image/upload`, { method: 'POST', body: formData })
            ).json()
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
