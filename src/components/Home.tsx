"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const types = ['Payment', 'Donation', 'Tipping', 'Premint'];
  const [typeIndex, setTypeIndex] = useState(0);

  useEffect(() => {
    const typeIndexInterval = setInterval(() => {
      setTypeIndex((i) => {
        i++;
        if (i > types.length - 1) i = 0;
        return i;
      });
    }, 5000);

    return () => {
      clearInterval(typeIndexInterval);
    }
  });

  return (
    <main className="home">
      <h1>LandingPay</h1>
      <h2>Build your <span className="page-type">{types[typeIndex]}</span> page in 1 minute</h2>
      <p>Effortlessly create stunning payment pages and securely collect crypto with LandingPay – your gateway to seamless transactions.</p>
      <Link className="link" href="/new">Let&apos;s get started</Link>
    </main>
  );
}