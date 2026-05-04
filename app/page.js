import { Suspense } from 'react';
import ZeldaList from './ZeldaList'; // Your interactive code
import { getGamesAction } from './actions';

export default async function Page() {
  // Fetch data on the server for speed
  const initialData = await getGamesAction();

  return (
    <Suspense fallback={<div className="text-white p-10">Loading Collection...</div>}>
      <ZeldaList initialData={initialData} />
    </Suspense>
  );
}
