import * as pdfjs from 'pdfjs-dist'
import 'pdfjs-dist/build/pdf.worker.min.js'
import * as mammoth from 'mammoth'

export const handleFileUpload = async (file: any) => {
  const reader = new FileReader()
  pdfjs.GlobalWorkerOptions.workerSrc = 'path_to_pdfjs/build/pdf.worker.min.js'

  reader.onload = async () => {
    const fileData = reader.result

    if (fileData && typeof fileData !== 'string') {
      const arrayBuffer = new Uint8Array(fileData)
      pdfjs.GlobalWorkerOptions.workerSrc = 'path_to_pdfjs/build/pdf.worker.min.js'

      const loadingTask = pdfjs.getDocument({data: arrayBuffer})
      const pdf = await loadingTask.promise

      const pdfContent = []

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const pageContent = await page.getTextContent()

        // const textContent = pageContent.items.map((item) => item.str).join(' ')

        // pdfContent.push(textContent)
      }

      const pdfText = pdfContent.join('\n') // Join content with newlines
      //   const htmlResult = await mammoth.convertToHtml({text: pdfText})

      //   const pdfHtml = `<div>${htmlResult.value}</div>`
      //   console.log(pdfHtml)
    }
  }

  reader.readAsArrayBuffer(file)
}
