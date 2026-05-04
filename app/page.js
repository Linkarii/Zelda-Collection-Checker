import { Suspense } from 'react';
import ZeldaList from './ZeldaList'; // Your interactive code
import { getGamesAction } from './actions';

// app/page.js
export default async function Page() {
  // Fetch with a 'tag' so Vercel can cache it
  const data = await fetch('YOUR_REDIS_URL_HERE', { 
    next: { tags: ['games-list'] } 
  });
  // ...
}

export default async function Page() {
  // Fetch data on the server for speed
  const initialData = await getGamesAction();

  return (
    <Suspense fallback={<div className="text-white p-10">Loading Collection...</div>}>
      <ZeldaList initialData={initialData} />
    </Suspense>
  );
}
