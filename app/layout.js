import { Capriola } from 'next/font/google'
import './globals.css'

const cap = Capriola
({ subsets: ['latin'],
  weight: '400',
  display: 'swap'
 })

export const metadata = {
  title: 'Redditor',
  description: 'A web app that scrapes data from Reddit.',
}

export default function RootLayout({ children, PopularPosts, Posts }) {
  return (
    <html lang="en">
      <body className={`${cap.className} bg-gradient-to-r from-slate-900 to-slate-700`}>
        {children}
        <div className="flex">
        <div className="w-0 md:w-1/4">
            {PopularPosts}
          </div>
          <div className="w-full md:w-9/12">
            {Posts}
          </div>
        </div>
        </body>
    </html>
  )
}