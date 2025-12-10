import React, { useState } from 'react'
import QRCode from 'react-qr-code'

const QRGenerator = () => {
  const [Text, setText] = useState("")
  const [Qr, setQr] = useState("")

  const generateQR = () => {
    if (!Text.trim()) {
      setText("");
      return;
    }

    setQr(Text);
  };

  const handleDownload = () => {
    const svg = document.getElementById('qrCode')
    const svgData = new XMLSerializer().serializeToString(svg);

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      const border = 40;

      canvas.width = img.width + 2 * border;
      canvas.height = img.height + 2 * border;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, border, border);

      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = "QR-Code.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  }

  return (
    <>
      <div className='flex justify-center items-center py-4'>
        <p className='text-2xl font-bold tracking-wide sm:text-4xl'>QR Code Generator</p>
      </div>
      <div className='flex justify-center items-center pt-5'>
        <div className=' flex flex-col justify-center items-center gap-5  w-[75%] sm:max-w-[65%] lg:max-w-[40%] bg-linear-to-r from-purple-300 to-indigo-300 p-5 border-none rounded-2xl'>
          <input type="text" placeholder='Enter text or URL'
            className="border-2 rounded-lg pr-5 p-2 w-full bg-gray-300 border-none text-[20px] font-medium text-gray-950 "
            value={Text} onChange={(e) => { setText(e.target.value) }} />

          <button className='bg-black p-2 px-4 text-white rounded-lg font-bold' onClick={generateQR}>Genrate QR</button>

          {Qr ? (
            <div className='flex justify-center items-center bg-white border-none rounded-[10px] w-40 h-40 p-4 sm:w-52 sm:h-52 lg:w-60 lg:h-60' >
              <QRCode id='qrCode' value={Qr} size={1024} bgColor="white" fgColor="black" />
            </div>
          ) : (
            <p className="text-gray-950 text-center">Type something to generate QR</p>
          )}

          {Qr && (
            <button className='bg-green-400 p-2 text-gray-500 hover:text-white border-green-400 rounded-lg font-bold' onClick={handleDownload}>Download</button>
          )}
        </div>
      </div>
    </>
  )
}

export default QRGenerator