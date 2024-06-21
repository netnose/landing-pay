import Home from "@/components/Home";
import { getFrameMetadata } from "@coinbase/onchainkit/core";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const frameData = getFrameMetadata({
    image: process.env.NEXT_PUBLIC_SITE_URL + '/new.jpg',
    buttons: [
      {
        action: 'link',
        label: 'Let\'s get started!',
        target: process.env.NEXT_PUBLIC_SITE_URL + '/new'
      }
    ]
  });
  
  return {
    title: 'Build your Payment page in 1 minute - LandingPay',
    description: 'Effortlessly create stunning payment pages and securely collect crypto with LandingPay – your gateway to seamless transactions.',
    openGraph: {
      title: 'Build your Payment page in 1 minute - LandingPay',
      description: 'Effortlessly create stunning payment pages and securely collect crypto with LandingPay – your gateway to seamless transactions.',
      images: process.env.NEXT_PUBLIC_SITE_URL + '/new.jpg'
    },
    other: {
        ...frameData
    }
  }
}

export default Home;

export const runtime = 'edge';
