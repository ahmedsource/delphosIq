import React from "react"
import {arrayFromMax} from '../../utils/helpers';
import router, { useRouter } from 'next/router';

type PaginationProps = {
  totalPages: number
} 
const Pagination:React.FC<PaginationProps> = ({totalPages})=>{
  const { query } = useRouter();
  return(
    <nav aria-label="Page navigation">
      <ul className="inline-flex">
        <li><button onClick={()=>router.push({ query: {page:Number(query?.page)>1 ? Number(query?.page)-1 : 1}})} className="h-10 px-5 text-blue-600 transition-colors duration-150 bg-white border border-r-0 border-blue-600 rounded-l-lg focus:shadow-outline hover:bg-blue-50">Prev</button></li>
        {arrayFromMax(totalPages).map(item=>( <li key={`pag-btn-${item}`}><button onClick={()=>router.push({ query: {page:item}})} className={`h-10 px-5 border-blue-600 transition-colors duration-150 border border-r-0 ${(query.page === String(item) || (!query.page&& item==1)) ? 'bg-blue-600 text-white hover:bg-blue-600' : 'text-blue-600 hover:bg-blue-50'} focus:shadow-outline`}>{item}</button></li>))}
        <li><button onClick={()=>router.push({ query: {page:Number(query?.page)<totalPages ? Number(query.page)+1 : totalPages}})} className="h-10 px-5 text-blue-600 transition-colors duration-150 bg-white border border-blue-600 rounded-r-lg focus:shadow-outline hover:bg-blue-50">Next</button></li>
      </ul>
    </nav>
  )
}

export default Pagination