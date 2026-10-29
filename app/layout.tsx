import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'StudyLens · Make it make sense',description:'Turn dense PDFs into clear, source-backed study guides and practice quizzes.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
