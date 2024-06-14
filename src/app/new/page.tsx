import NewPayment from "@/components/NewPayment";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { getFrameMetadata } from "@coinbase/onchainkit/core";
import { FrameMetadata } from "@coinbase/onchainkit/frame";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const requestCtx = getRequestContext();
    const frameData = getFrameMetadata({
        image: requestCtx.env.SITE_URL + '/new.jpg',
        buttons: [
            {
                action: 'link',
                label: 'Let\'s get started!',
                target: requestCtx.env.SITE_URL + '/new'
            }
        ]
    })
    
    return {
      title: 'Build your Payment page in 1 minute',
      description: 'Anybody can create a Landing Pay and get paid in crypto',
      openGraph: {
        title: 'Build your Payment page in 1 minute',
        images: requestCtx.env.SITE_URL + '/new.jpg'
      },
      other: {
          ...frameData
      }
    }
  }
  
  export default NewPayment;

  export const runtime = 'edge';