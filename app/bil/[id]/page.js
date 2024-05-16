"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode.react';
import generatePayload from 'promptpay-qr';

export default function Pageid({ params }) {
  const id = params.id; // Ensure `params` is passed correctly to this component.
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [qrCode, setQrCode] = useState("sample");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://api.adsdep.com/bil/${id}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await res.json();
        setData(jsonData);
        setLoading(false);

        // Calculate total price and generate QR code inside same effect
        if (jsonData) {
          const totalPriceCalculated = jsonData[0].ads_price + jsonData[0].price;
          setTotalPrice(totalPriceCalculated);
          const qrCodeData = generatePayload("095-642-2872", { amount: totalPriceCalculated });
          setQrCode(qrCodeData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const copyText = () => {
    navigator.clipboard.writeText("1761696374").then(
      () => setCopySuccess(true),
      () => console.error('Unable to copy text')
    );
  };

  if (!data || data.length === 0) {
    return <div className='text-center mt-5 h1'>404 - Page Not Found</div>;
  }

  return (
    <>
      <main id='box'>
     
        <div className="container">
          <div className="text-center mt-3">
            <Image src='/img/favicon.ico' width={70} height={70} className='mt-5' alt='logo' />
            <p>@adsmanager 0956422872</p>
            <h6>ใบเสนอราคา แจ้งรายละเอียดบริการต่าง</h6>
          </div>

          <div className="mt-4 "></div>
          <div className="d-flex justify-content-around">

        

          <h5>ลูกค้า :{data[0].namebil} </h5>
          
          <h6>  No. 2024{data[0].id}</h6>


          </div>
          <div className="linecut "></div>
          <div className="text-center mt-3">
            รายละเอียดบริการ
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">รายละเอียด</th>
                <th scope="col"></th>
                <th scope="col">ยอดเงิน</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>{data[0].name}</td>
                <td></td>
                <td>{data[0].price}</td>
              </tr>
              <tr>
                <td></td>
                <td>{data[0].ads}</td>
                <td></td>
                <td>{data[0].ads_price}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td><b>Total Price</b></td>
                <td><b>{totalPrice}บาท</b></td>
              </tr>
            </tbody>
          </table>
          <div className="linecut"></div>
          <div className="a">
            <div className="b">
              <img src="/img/p.png" width={200} alt="" />
             <QRCode value={qrCode} style={{ width: 200, height: 200 }} alt='logo'/>

            </div>
            <div className="c">
              <div className="text-center">
                <Image src="/img/b.jpg" width={80} height={80} className='mt-3'alt='logo' />
                <h5>ธนาคารกสิกรไทย</h5>
                <h6>น.ส เจริญ กายสิทธิ์</h6>
                <h3>1761696374</h3>
                {copySuccess && <p style={{ color: 'green' }}>คัดลอก 1761696374 แล้ว!</p>}
                <button className='mt-3' onClick={copyText}>Copy</button>
              </div>
            </div>
          </div>
        </div>
       

      </main>
    </>
  );

}





