
import Container from '@/components/molecules/Container';
import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
  }
export default function BlogLayout({ children }: ContainerProps) {
  return (
    <div>
      <Container>
        {children}
      </Container>
    </div>
  );
}
