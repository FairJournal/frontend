import Embed from '@editorjs/embed'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'

export const getEditorJsTools = (authorId: number) => {
  return {
    embed: Embed,
    header: Header,
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
    marker: Marker,
    list: List,
    warning: Warning,
    code: Code,
    raw: Raw,
    quote: Quote,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
  }
}
