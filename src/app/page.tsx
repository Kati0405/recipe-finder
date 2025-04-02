'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { CUISINES } from './lib/constants';

export default function Home() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [prepTime, setPrepTime] = useState('');

  const isNextEnabled =
    searchQuery.trim() !== '' || cuisine !== '' || prepTime !== '';

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();

    if (searchQuery) searchParams.set('query', searchQuery);
    if (cuisine) searchParams.set('cuisine', cuisine);
    if (prepTime) searchParams.set('prepTime', String(prepTime));

    router.push(`/recipes?${searchParams.toString()}`);
  };

  return (
    <div className='min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-center px-4 py-12'>
      <main className='w-full max-w-md bg-white rounded-2xl shadow-sm p-6 sm:p-8 space-y-6'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-primary mb-2'>
            Recipe Finder
          </h1>
          <p className='text-gray-600 text-sm'>Find your favorite recipes</p>
        </div>

        <form onSubmit={handleFormSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='query'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Recipe Name
            </label>
            <input
              id='query'
              type='text'
              placeholder='e.g. pasta, salad...'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor='cuisine'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Cuisine
            </label>
            <select
              id='cuisine'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm'
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            >
              <option value=''>Select Cuisine</option>
              {CUISINES.map((cuisine) => (
                <option key={cuisine} value={cuisine.toLowerCase()}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor='prep-time'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Max Prep Time (minutes)
            </label>
            <input
              id='prep-time'
              type='number'
              min='1'
              placeholder='e.g. 30'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm'
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
            />
          </div>

          <button
            type='submit'
            className={`w-full py-2.5 text-sm font-medium rounded-lg transition-all duration-300
            ${
              isNextEnabled
                ? 'bg-amber-200 text-black hover:bg-primary__pressed shadow-sm active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
            disabled={!isNextEnabled}
          >
            Next
          </button>
        </form>
      </main>
    </div>
  );
}
