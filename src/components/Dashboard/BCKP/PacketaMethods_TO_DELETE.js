//SHOW PDF DIRECTLY FROM API
  const printPacketaSippingLabel = async () => {
    const data = {
      packetaId: orderDetail.delivery.resultId,
      id: orderDetail.id,
    }
    try {
      const response = await dispatch(printPacketaLabel(data))
      console.log(response.payload)
      const xmlString = response.payload.base64PdfData
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml')

      // Access the text content of the 'result' element
      // const base64String = xmlDoc.querySelector('result').textContent
      const byteCharacters = atob(xmlString)
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const pdfBlob = new Blob([byteArray], { type: 'application/pdf' })
      //  const pdfId = Date.now();
      //  navigate(`/dashboard/print-label/${pdfBlob}`)
      const url = URL.createObjectURL(pdfBlob)
      window.open(url, '_blank')
    } catch (error) {
      console.error('Error:', error)
      // Handle any errors
    }
  }

  const printLabel = () => {
    if (orderDetail.delivery.deliveryType === 'PP/BOX') {
      printPacketaSippingLabel()
      console.log('Printing PP')
    } else if (orderDetail.delivery.deliveryType === 'HD') {
      printPacketaSippingLabelHD()
    }
  }

  const printPacketaSippingLabelHD = async () => {
    try {
      const data = {
        packetaId: orderDetail.delivery.resultId,
        id: orderDetail.id,
      }
      const response = await dispatch(printPacketaLabelHD(data))
      console.log(response)
    } catch {}
  }
