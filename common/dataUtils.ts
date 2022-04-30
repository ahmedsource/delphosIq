import {data} from './data';
import type { Project,Tag, BaseProject } from './types';
import { ParsedUrlQuery } from 'querystring';
import {uniqBy, prop, map, equals, pick, sortBy, pipe, filter} from 'ramda';


const trimStr = (str: string) => str.replace(/,/g, '').replace(/€/g, '')

export const trimData =(data: Array<any>)=> {
  const trimmedData = map<any, any>(pick<any>(['id', 'primaryTags', 'title', 'additionalInformation', 'startDate']), data)
  const modified = trimmedData.map((x: BaseProject)=>{
    const country = x.primaryTags.filter(tag => tag.subType === 'countries')[0].value;
    const sector = x.primaryTags.filter(tag => tag.subType === 'sectors')[0].value;
    const region = x.primaryTags.filter(tag => tag.subType === 'regions')[0].value;
    const startYear = new Date(x.startDate).getFullYear()
    return({
      ...x,
      date: x.additionalInformation[1],
      amount: Number(trimStr(''+x.additionalInformation[0])),
      humanDate: x.additionalInformation[2],
      country,
      sector,
      region,
      startYear
    })
  })
  return modified
}

export const getPaginatedProjects = (q: ParsedUrlQuery) => {
  console.log({q})
  const page = q.page || 1;
  const from=q.from || 1959;
  const to = q.to || 2022
  const sortByParam = q.sortBy || 'title'
  const perPage = Number(q.perPage || 10);
  const offset = (Number(page) - 1) * Number(perPage);
  const greaterThanFrom = (x:Project)=> x.startYear >= from;
  const smallerThanTo = (x:Project)=> x.startYear <= to;
  const containCountry = (x:Project)=> q.countries ? q.countries.includes(x.country) : true;
  const containSector = (x:Project)=> q.sectors ? q.sectors.includes(x.sector) : true;
  const containRegions = (x:Project)=> q.regions ? q.regions?.includes(x.region) : true;
  
  const allResults = pipe(
    filter(greaterThanFrom),
    filter(smallerThanTo),
    filter(containCountry),
    filter(containSector),
    filter(containRegions)
  )(sortBy<any>(prop<any>(sortByParam), trimData(data)))
  
  const items = allResults.slice(offset, Number(perPage) + Number(offset));
  return ({
    items,
    total: items.length,
    totalPages: Math.ceil(Number(allResults.length)/Number(perPage))
  })
}

export const getByMetaSelector = (selector:string) => {
  const mapper = ({primaryTags}:Project)=> primaryTags.find(({subType})=>equals(subType,selector))
  const filtered = map<any,any>(mapper, data)
  const uniqueValues = uniqBy(prop('value'))(filtered)
  return map(pick(['label', 'value']), uniqueValues)
}

export const getSectors = () => getByMetaSelector('sectors');
export const getCountries = () => getByMetaSelector('countries');
export const getRegions = () => getByMetaSelector('regions')