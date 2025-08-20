import Image from "next/image";
import React, { useEffect, useState } from "react";
import supabase from "@/lib/db"; // Sesuaikan dengan path file supabaseClient Anda
import Link from "next/link";

const Footer = () => {
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [todayVisitors, setTodayVisitors] = useState(0);
  const [yesterdayVisitors, setYesterdayVisitors] = useState(0);

  useEffect(() => {
    async function fetchVisitorStats() {
      // Ambil seluruh visitor_count untuk total pengunjung
      const { data: totalData, error: totalError } = await supabase
        .from("visitors")
        .select("visitor_count");

      if (!totalError && totalData) {
        const total = totalData.reduce((acc, i) => acc + i.visitor_count, 0);
        setTotalVisitors(total);
      }

      // Hitung tanggal hari ini dan kemarin
      const todayStr = new Date().toISOString().split("T")[0];
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterdayStr = yesterdayDate.toISOString().split("T");

      // Ambil pengunjung hari ini
      const { data: todayData, error: todayError } = await supabase
        .from("visitors")
        .select("visitor_count")
        .eq("visit_date", todayStr);

      if (!todayError && todayData) {
        const totalToday = todayData.reduce((acc, i) => acc + i.visitor_count, 0);
        setTodayVisitors(totalToday);
      }

      // Ambil pengunjung kemarin
      const { data: yesterdayData, error: yesterdayError } = await supabase
        .from("visitors")
        .select("visitor_count")
        .eq("visit_date", yesterdayStr);

      if (!yesterdayError && yesterdayData) {
        const totalYesterday = yesterdayData.reduce((acc, i) => acc + i.visitor_count, 0);
        setYesterdayVisitors(totalYesterday);
      }
    }

    fetchVisitorStats();
  }, []);

  return (
    <footer className="bg-white pt-12 pb-8 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
        {/* Logo dan Social Links */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/images/logo-zis.png"
              width={100}
              height={100}
              alt="Logo ZIS"
            />
            <span className="font-bold text-2xl tracking-wide">
              LAZISMU SUMATERA BARAT
            </span>
          </div>
          <p className="text-sm mb-4">
            Lembaga Amil Zakat Nasional terpercaya di Sumatera Barat.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.instagram.com/lazismusumaterabarat/"
              target="_blank"
              aria-label="Instagram"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-transform transform hover:scale-110"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25A5.25 5.25 0 1 1 6.75 12 5.25 5.25 0 0 1 12 6.75zm0 1.5A3.75 3.75 0 1 0 15.75 12 3.75 3.75 0 0 0 12 8.25zm5.38-1.13a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-orange-400 transition-transform transform hover:scale-110"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5.02 3.66 9.16 8.44 9.93v-7.03H7.9v-2.9h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.62.77-1.62 1.56v1.87h2.77l-.44 2.9h-2.33v7.03C18.34 21.23 22 17.09 22 12.07"></path>
              </svg>
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="hover:text-orange-400 transition-transform transform hover:scale-110"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.8 8.001a2.749 2.749 0 00-1.929-1.943C18.01 5.5 12 5.5 12 5.5s-6.01 0-7.871.558A2.749 2.749 0 002.2 8.001C1.5 9.86 1.5 12 1.5 12s0 2.14.7 3.999a2.749 2.749 0 001.929 1.943C5.99 18.5 12 18.5 12 18.5s6.01 0 7.871-.558a2.749 2.749 0 001.929-1.943C22.5 14.14 22.5 12 22.5 12s0-2.14-.7-3.999zM10 15.5v-7l6 3.5-6 3.5z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@lazismusumaterabarat"
              target="_blank"
              aria-label="Tiktok"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-transform transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Kontak</h3>
          <ul className="space-y-3 text-sm">
            <li>
              Jl. Bundo Kanduang No.1, Belakang Tangsi, Kec. Padang Bar., Kota Padang, Sumatera Barat
            </li>
            <li>
              Email:{" "}
              <a href="mailto:lazismusumaterabarat@gmail.com" className="hover:text-orange-400">
                lazismusumaterabarat@gmail.com
              </a>
            </li>
            <li>
              Telp:{" "}
              <a href="tel:+6282391707227" className="hover:text-orange-400">
                0823 9170 7227
              </a>
            </li>
          </ul>
        </div>

        {/* Statistik Pengunjung menggantikan Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Statistik Pengunjung</h3>
          <ul className="space-y-3 text-sm">
            <li>Total Pengunjung: {totalVisitors}</li>
            <li>Pengunjung Hari Ini: {todayVisitors}</li>
            <li>Pengunjung Kemarin: {yesterdayVisitors}</li>
          </ul>
        </div>
      </div>

      {/* Gambar dekoratif kanan bawah */}
      <div className="absolute bottom-0 -right-10 md:-right-16 pointer-events-none">
        <div className="w-[330px] md:w-[300px]">
          <Image
            src="/images/element-footer1.png"
            width={350}
            height={350}
            alt="Dekoratif Footer Kanan Bawah"
            className="w-full h-auto"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
