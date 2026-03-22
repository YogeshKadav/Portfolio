import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yogesh Kadav | Backend Engineer · .NET & Azure',
  description:
    'Portfolio of Yogesh Kadav — Backend Engineer with 4 years of experience building production REST APIs, event-driven cloud pipelines, and enterprise automation systems using .NET, Azure, and Docker.',
  keywords: ['Yogesh Kadav', 'Backend Engineer', '.NET Developer', 'C#', 'ASP.NET Core', 'Azure Functions', 'Docker', 'REST API', 'Pune', 'India'],
  authors: [{ name: 'Yogesh Kadav' }],
  openGraph: {
    title: 'Yogesh Kadav | Backend Engineer · .NET & Azure',
    description: 'Portfolio of Yogesh Kadav — Backend Engineer specialising in .NET Core, Azure, and production-grade API systems.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Playfair Display — elegant serif for headings */}
        {/* Lato — clean humanist sans for body */}
        {/* DM Mono — refined monospace for labels / code */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Lato:wght@300;400;700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0906" />
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
