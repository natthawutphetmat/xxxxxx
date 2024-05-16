"use client";

import React, { useEffect, useState } from 'react';
import Pageok from './pageok';
import Head from 'next/head';

export default function Page() {
    const [login, setLogin] = useState();

    useEffect(() => {
        // เรียกใช้ localStorage แค่บน client-side
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        setLogin(loggedInStatus);

        if (loggedInStatus !== 'admin') {
            console.log('Not logged in as admin, redirecting...');
            router.push('/login');
        }
    }, []);

    return (
        <>
            <Head>
                <title>ชื่อเพจ</title>
                <meta name="description" content="คำอธิบายเพจ" />
            </Head>
            <div>
                <Pageok />
            </div>
        </>
    );
}
