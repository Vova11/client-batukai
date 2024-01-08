import React, { useEffect, useState } from 'react'
function PdfViewer({id, dataUri}) {
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const iframe = document.getElementById('pdfIframe')
        iframe.src = dataUri
      } catch (error) {
        console.log(error);
        console.error('Error fetching PDF:', error)
      }
    }
    fetchData() // Call the async function to fetch the PDF
  }, [])

  return (
    <div>
      <iframe
        id='pdfIframe'
        title='PDF Viewer'
        width='100%'
        height='600'
      ></iframe>
    </div>
  )
}

export default PdfViewer



// import React, { useEffect, useState } from 'react'
// import customFetch from '../../utils/axios'

// import { useParams } from 'react-router-dom'
// import axios from 'axios'
// function PdfViewer({id}) {
//   const { pdfId } = useParams()
//   const [loading, setLoading] = useState(false)
//   useEffect(() => {
//     setLoading(true)
//     const fetchData = async () => {
      
//       try {
//         // Use your customFetch here to fetch the PDF with the 'blob' responseType
//         const response = await customFetch.get(`/shipping/getPdf/${pdfId}`, {
//           responseType: 'blob',
//         })
//         console.log(response)
//         const url = URL.createObjectURL(response.data)

//         const iframe = document.getElementById('pdfIframe')
//         iframe.src = url
//       } catch (error) {
//         console.log(error);
//         console.error('Error fetching PDF:', error)
//       }
      
//     }

//     fetchData() // Call the async function to fetch the PDF
//     setLoading(false)  
//   }, [])

//   if (loading) {
//     return <p>Loading PDF...</p>
//   }

//   return (
//     <div>
//       <iframe
//         id='pdfIframe'
//         title='PDF Viewer'
//         width='100%'
//         height='600'
//       ></iframe>
//     </div>
//   )
// }

// export default PdfViewer
