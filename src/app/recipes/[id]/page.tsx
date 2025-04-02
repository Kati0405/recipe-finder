import { Suspense } from 'react';
import RecipeDetails from './RecipeDetails';
import BackButton from '@/app/components/BackButton/BackButton';

export default function RecipePage({ params }: { params: { id: string } }) {
  return (
    <main
      className='min-h-screen bg-gray-50 text-gray-900 px-4 py-10 sm:px-6 lg:px-8'
      aria-labelledby='recipe-detail-title'
    >
      <div className='max-w-4xl mx-auto space-y-6'>
        <BackButton />
        <header>
          <h1
            id='recipe-detail-title'
            className='text-3xl sm:text-4xl font-bold text-primary'
          >
            Recipe Details
          </h1>
        </header>

        <Suspense fallback={<p className='text-gray-500'>Loading recipe...</p>}>
          <RecipeDetails params={params} />
        </Suspense>
      </div>
    </main>
  );
}
