import { CarCard, CustomFilters, Hero, SearchBar, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/contants';
import { FilterProps } from '@/types/car';
import { fetchCars } from '@/utils'
import { Suspense } from 'react';

export default async function Home({ searchParams }: { searchParams: FilterProps }) {
  const allCars = await fetchCars({
    manufacturer: searchParams?.manufacturer || "",
    year: searchParams?.year || 2022,
    fuel: searchParams?.fuel || "",
    limit: searchParams?.limit || 10,
    model: searchParams?.model || ""
  });

  const isDataEmpty = !Array.isArray(allCars) || !allCars?.length || !allCars
  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id="discover">
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>
            Car Catalogue
          </h1>

          <p>Explore out cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            <CustomFilters title='fuel' options={fuels} value={searchParams?.fuel || ""}/>
            <CustomFilters title='year' options={yearsOfProduction} value={searchParams?.year?.toString() || ""}/>
          </div>
        </div>

        {
          !isDataEmpty ?
            <section>
              <div className='home__cars-wrapper'>
                {
                  allCars?.map((car, index) => (
                    <Suspense fallback={<div>Loading...</div>}>
                      <CarCard
                        key={`${car?.class}-${index}`}
                        car={car}
                      />
                    </Suspense>
                  ))
                }

              </div>

              <ShowMore
                pageNumber={(searchParams?.limit || 10) / 10}
                isNext={(searchParams?.limit || 10) > allCars?.length}
              />
            </section>
            :
            <div className='home__error-container'>
              <h2 className='text-black text-xl font-bold'>
                Oops, no results
              </h2>
            </div>
        }
      </div>
    </main>
  )
}
