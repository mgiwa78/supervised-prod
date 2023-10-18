import Quill, {DeltaStatic} from 'quill'

class CustomHighlighting {
  private quill: Quill

  constructor(quill: Quill, options: any = {}) {
    this.quill = quill

    this.quill.on('text-change', this.onTextChange.bind(this))
  }

  private onTextChange(delta: DeltaStatic, oldDelta: DeltaStatic | null, source: string) {
    if (source === 'user') {
      this.highlightSyntax()
    }
  }

  private highlightSyntax() {
    const editorContent = this.quill.getContents()

    editorContent.ops.forEach((op: any) => {
      if (op.insert && typeof op.insert === 'string') {
        const startIndex = op.insert.indexOf('/*')
        const endIndex = op.insert.indexOf('*/')
        if (startIndex !== -1 && endIndex !== -1) {
          const length = endIndex + 2 - startIndex
          this.quill.formatText(op.offset + startIndex, length, 'highlight', true)
        }
      }
    })
  }
}

export default CustomHighlighting
