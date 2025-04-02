import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type Recipe = {
  id: number;
  title: string;
  image: string;
};

type SpoonacularResponse = {
  results: Recipe[];
};

export const revalidate = 60;

async function fetchRecipes({
  query,
  cuisine,
  maxReadyTime,
}: {
  query?: string;
  cuisine?: string;
  maxReadyTime?: string;
}): Promise<Recipe[]> {
  const apiKey = process.env.SPOONACULAR_API_KEY;

  const params = new URLSearchParams();
  if (query) params.set('query', query);
  if (cuisine) params.set('cuisine', cuisine);
  if (maxReadyTime) params.set('maxReadyTime', maxReadyTime);
  params.set('apiKey', apiKey || '');

  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error('Failed to load recipes');

  const data: SpoonacularResponse = await res.json();
  return data.results;
}

interface RecipesPageProps {
  searchParams: {
    query?: string;
    cuisine?: string;
    prepTime?: string;
  };
}

export default async function RecipesList({ searchParams }: RecipesPageProps) {
  const { query, cuisine, prepTime } = searchParams;

  if (!query && !cuisine && !prepTime) {
    redirect('/');
  }

  const recipes = await fetchRecipes({
    query,
    cuisine,
    maxReadyTime: prepTime,
  });

  return (
    <section
      aria-labelledby='recipes-heading'
      className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
    >
      <h2 id='recipes-heading' className='sr-only'>
        Recipe Results
      </h2>

      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <Link
            key={recipe.id}
            href={`/recipes/${recipe.id}`}
            className='group bg-white rounded-xl shadow-sm p-4 flex flex-col items-center hover:shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
            aria-label={`View details for ${recipe.title}`}
          >
            <div className='w-full relative aspect-[4/3] overflow-hidden rounded-lg mb-3'>
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                sizes='(max-width: 768px) 100vw, 33vw'
                className='object-cover'
              />
            </div>
            <h2 className='text-center text-base font-medium text-gray-800 group-hover:text-primary transition'>
              {recipe.title}
            </h2>
          </Link>
        ))
      ) : (
        <p className='col-span-full text-center text-gray-600'>
          No recipes found.
        </p>
      )}
    </section>
  );
}
