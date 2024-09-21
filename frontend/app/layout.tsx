import Link from 'next/link';
import './globals.css';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='flex flex-col justify-between h-dvh'>
        <header className='bg-gray-500 p-4'>
          <Link href="/" className="text-4xl">Countries</Link>

        </header>
        {children}
        <footer className='bg-gray-500 p-4'>
          <h2 className='text-base'>Coding challenge for DevelopsToday</h2>
          <h3 className='text-sm'>by Juan Manuel Zimmermann</h3>
        </footer>
      </body>
    </html>
  );
}
