import React from "react";
import type { Projects, SelectOption } from '../../common/types';
import router from 'next/router';
import {sortingTypes, generateYearsOptions} from '../../utils/helpers';
import Select from '../Select';
import { useFormik } from 'formik';
import { ParsedUrlQuery } from 'querystring';


type FiltersBarProps = {
  sectors: Array<SelectOption>
  regions: Array<SelectOption>
  countries: Array<SelectOption>
  query: ParsedUrlQuery
}

const FiltersBar:React.FC<FiltersBarProps> = ({sectors, regions, countries, query})=>{
  const formik = useFormik({
    enableReinitialize: true,
    initialValues:{
      sortBy: query.sortBy || 'title',
      from:  query.from || '1959',
      to:  query.to || '2022',
      regions: query.regions || [],
      countries: query.countries || [],
      sectors: query.sectors || []
    },
    onSubmit: values => {
      router.push(
        {
          pathname: '/',
          query: { 
            ...values,
            page: 1
          },
        },
      )
    }
  });
  return(
    <div className='grid grid-cols-1 md:grid-cols-7 gap-4 auto-rows-max pt-3 pb-3 bg-blue-100'>
      <Select
        items={sortingTypes}
        selectedItem={formik.values.sortBy}
        onChange={(val:string) => formik.setFieldValue('sortBy', val)}
        multiple={false}
        labelText="Sort By"
      />
      <Select
        items={generateYearsOptions('1959')}
        selectedItem={formik.values.from}
        onChange={(val:string) => formik.setFieldValue('from', val)}
        multiple={false}
        labelText="From"
      />
      <Select
        items={generateYearsOptions('1959')}
        selectedItem={formik.values.to}
        onChange={(val:string) => formik.setFieldValue('to', val)}
        multiple={false}
        labelText="To"
      />
      <Select
        items={regions}
        selectedItem={formik.values.regions}
        onChange={(val:string) => formik.setFieldValue('regions', val)}
        multiple={true}
        labelText="Regions"
      />
      <Select
        items={countries}
        selectedItem={formik.values.countries}
        onChange={(val:string) => formik.setFieldValue('countries', val)}
        multiple={true}
        labelText="Countries"
      />
      <Select
        items={sectors}
        selectedItem={formik.values.sectors}
        onChange={(val:string) => formik.setFieldValue('sectors', val)}
        multiple={true}
        labelText="Sectors"
      />
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={formik.submitForm}
      >
        Search
      </button>
    </div>
  )
}

export default FiltersBar