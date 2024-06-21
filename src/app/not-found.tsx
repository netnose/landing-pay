import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main className="not-found">
      <div className="emoji">😵</div>
      <h1>Page not found</h1>
      <p>Could not find requested page</p>
      <Link href="/">Home</Link>
    </main>
  )
}

export const runtime = 'edge';
