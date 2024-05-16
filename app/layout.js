import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bil:แจ้งรายละเอียดค่าบริการ",
  description: "Bil:แจ้งรายละเอียดค่าบริการโฆษณา และ รายละเอียดต่าง",

};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
