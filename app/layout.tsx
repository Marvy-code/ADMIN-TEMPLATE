import Link from 'next/link';
import '../styles/globals.css';
import Image from 'next/image';
import Menu from '@/components/Menu';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { UserProvider } from './context/UserContext'; // Importer le contexte

export const metadata = {
  title: 'DIGI-ODM | ARPCE',
  description: '',
}

export default function RHLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body>
      <UserProvider>
        <div className="h-screen flex font-primary">
          {/* Left */}
          <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 shadow-inner bg-gray-200">
            <Link href='/' className='flex items-center justify-center lg:justify-start gap-2'>
              <Image src={'/assets/images/Logo_arpce.png'} alt='ARPCE' width={70} height={70} />
              <span className='hidden lg:block text-[15px] font-bold text-[#769C38]'>DIGI ODM</span>
            </Link>

            <Menu/>
          </div>
          {/* Right */}
          <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll">
            <Nav/>
            {children}

            <Footer/>
          </div>
        </div>
        </UserProvider>
      </body>
    </html>
  )
}
