'use client';

import { processString } from '@/actions/processString';
import { Button } from '@/components/ui/button';
import { use } from 'react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function Page({ params }: PageProps) {
  const { slug } = use(params);
  
  const handleClick = async () => {
    const result = await processString(slug);
    console.log('Process result:', result);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Post: {slug}</h1>
      <Button onClick={handleClick}>
        Process String
      </Button>
      <p className="mt-4">Click the button to process the string and check console for results.</p>
    </div>
  );
}