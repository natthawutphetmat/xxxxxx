"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode.react';

const generatePayload = require('promptpay-qr');

export default function Pageid({ params }) {
  const id = params.id;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("095-642-2872");
  const [amount, setAmount] = useState(1.00);
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
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  function handleAmount(e) {
    if (e.target.value > 0) {
      setAmount(parseFloat(e.target.value));
    } else setAmount(0);
  }

  useEffect(() => {
    if (data) {
      const totalPrice = data[0].ads_price + data[0].price;
      setTotalPrice(totalPrice);
    }
  }, [data]);

  useEffect(() => {
    const qrCodeData = generatePayload(phoneNumber, { amount: totalPrice });
    setQrCode(qrCodeData);
  }, [phoneNumber, totalPrice]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error: Failed to fetch data</div>;
  }

  const copyText = () => {
    setCopySuccess(true);
  };

  const handlePrint = () => {
    // Handle print functionality here
  };

  return (
    <>
      <main id='box'>
        <div className="container">
          <div className="text-center mt-3">
            <Image src='/img/favicon.ico' width={70} height={70} className='mt-5' />
            <p>@adsmanager 0956422872</p>
            <h6>ใบเสนอราคา แจ้งรายละเอียดบริการต่าง</h6>
          </div>

          <div className="mt-4 "></div>
          <div class="d-flex justify-content-around">

       

          <h5>ลูกค้า : {data[0].namebil}</h5>
          
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
             <QRCode value={qrCode} style={{ width: 200, height: 200 }} />

            </div>
            <div className="c">
              <div className="text-center">
                <Image src="/img/b.jpg" width={80} height={80} className='mt-3' />
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
