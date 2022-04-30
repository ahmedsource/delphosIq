import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import type { Projects, SelectOption } from '../common/types';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {getPaginatedProjects, getSectors, getRegions, getCountries} from '../common/dataUtils';
import Table from '../components/Table';
import FiltersBar from '../components/FiltersBar';
import Pagination from '../components/Pagination';
import NavBar from '../components/NavBar';
import Graph from '../components/Graph';
import {isEmpty} from 'ramda'
type HomeProps = {
  projects: Projects
  sectors: Array<SelectOption>
  regions: Array<SelectOption>
  countries: Array<SelectOption>
}

const Home: NextPage<HomeProps> = ({projects, sectors, regions, countries}) => {
  const { query } = useRouter();

  return (
    <main className="container center mx-auto pb-6">
      <Head>
        <title>DelphosIQ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <FiltersBar sectors={sectors} regions={regions} countries={countries} query={query} />
      {isEmpty(projects.items) ?
        <div className='text-center'>No Results</div>
      :
        <>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-3 mb-6'>
            <Table
              tableHeaders={['Signature date', 'Title', 'Country', 'Sectors', 'Signed Amount']}
              tableData={projects.items}
            />
            <Graph items={projects.items}/>
          </div>
          <Pagination totalPages={projects.totalPages} />
        
        </>
      }
    </main>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  ctx
) => {
  const [regions, countries,  sectors, projects] = await Promise.all([getRegions(), getCountries(), getSectors(), getPaginatedProjects(ctx.query)]);
  return { props: { sectors, regions, countries, projects } };
};


