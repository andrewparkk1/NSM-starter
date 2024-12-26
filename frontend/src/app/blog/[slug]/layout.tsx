import { use } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default function Layout({ children, params }: LayoutProps) {
  const { slug } = use(params);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {children}
      </div>
    </div>
  );
}