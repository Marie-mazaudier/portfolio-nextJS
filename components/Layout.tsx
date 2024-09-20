import { ReactNode } from 'react';
import Footer from './organisms/Footer/Footer';

interface LayoutProps {
  children: ReactNode;
  preview?: boolean;
  
}

export default function Layout({ children, preview  }: LayoutProps) {
  return (
    <div>
      {preview && <div className="preview">This is a preview mode!</div>}
      <main>{children}</main>
     
    </div>
  );
}
