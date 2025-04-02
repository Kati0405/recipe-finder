import { Suspense } from 'react';
import RecipesList from './RecipesList';
import BackButton from '../components/BackButton/BackButton';

export default function RecipesPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <main
      className='min-h-screen bg-gray-50 text-gray-900 px-4 py-10 sm:px-6 lg:px-8'
      aria-labelledby='recipes-page-title'
    >
      <div className='max-w-6xl mx-auto space-y-8'>
        <BackButton />
        <header>
          <h1
            id='recipes-page-title'
            className='text-3xl sm:text-4xl font-bold text-primary'
          >
            Recipes
          </h1>
        </header>

        <Suspense
          fallback={<p className='text-gray-500'>Loading recipes...</p>}
        >
          <RecipesList searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
