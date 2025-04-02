import Image from 'next/image';

import { notFound } from 'next/navigation';

type Ingredient = {
  id: number;
  original: string;
};

type RecipeDetails = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  instructions: string;
  extendedIngredients: Ingredient[];
};

export const dynamic = 'force-dynamic';
export const revalidate = 60;

async function fetchRecipe(id: string): Promise<RecipeDetails | null> {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  const data: RecipeDetails = await res.json();
  return data;
}

export default async function RecipeDetailsPage(props: { params: { id: string } }) {
  const { id } = props.params;
  const recipe = await fetchRecipe(id);

  if (!recipe) {
    notFound();
  }

  return (
    <article
      aria-labelledby='recipe-title'
      className='max-w-4xl mx-auto bg-white rounded-2xl shadow-sm px-4 py-8 sm:px-6 lg:px-8 space-y-8'
    >
      <header className='space-y-2'>
        <h1
          id='recipe-title'
          className='text-2xl sm:text-3xl font-bold text-primary'
        >
          {recipe.title}
        </h1>
      </header>

      <div className='relative w-full aspect-[4/3] rounded-xl overflow-hidden'>
        <Image
          src={recipe.image || '/noimage.png'}
          alt={recipe.title}
          fill
          sizes='(max-width: 768px) 100vw, 600px'
          className='object-cover'
        />
      </div>

      <section
        aria-label='Recipe meta and ingredients'
        className='text-gray-800 space-y-6'
      >
        <p className='text-sm text-gray-500'>
          ⏱ Ready in{' '}
          <span className='font-medium text-gray-700'>
            {recipe.readyInMinutes} minutes
          </span>
        </p>

        {recipe.extendedIngredients.length > 0 && (
          <div>
            <h2 className='text-lg font-semibold mb-2'>Ingredients</h2>
            <ul className='list-disc list-inside text-sm space-y-1'>
              {recipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {recipe.instructions && (
        <section aria-label='Instructions' className='text-gray-800 space-y-3'>
          <h2 className='text-lg font-semibold'>Instructions</h2>
          <p className='text-sm leading-relaxed whitespace-pre-line'>
            {recipe.instructions.replace(/<\/?[^>]+(>|$)/g, '')}
          </p>
        </section>
      )}
    </article>
  );
}
