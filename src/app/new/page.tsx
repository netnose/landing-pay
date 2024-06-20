import NewPayment from "@/components/NewPayment";
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
      description: 'Anybody can create a Payment page and get paid in crypto',
      openGraph: {
        title: 'Build your Payment page in 1 minute - LandingPay',
        description: 'Anybody can create a Payment page and get paid in crypto',
        images: process.env.NEXT_PUBLIC_SITE_URL + '/new.jpg'
      },
      other: {
          ...frameData
      }
    }
  }
  
  export default NewPayment;

  export const runtime = 'edge';
  