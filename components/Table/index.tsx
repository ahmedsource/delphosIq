import React from "react";

type TableProps ={
  tableHeaders: Array<String>,
  tableData: Array<object>
}
const Table: React.FC<TableProps> = ({tableHeaders, tableData})=> {
  return (
    <table className="border mx-auto w-full">
      <thead className="bg-blue-400 border-b">
        <tr>
        {tableHeaders.map((th, i)=>(
          <th key={`table-header-${i}`} scope="col" className="text-sm whitespace-nowrap font-medium text-gray-900 px-4 py-3 text-left">{th}</th>
        ))}
        </tr>
      </thead>
      <tbody className="align-top">
      {tableData.map(({additionalInformation, title, primaryTags, id}, i)=>{
        const country = primaryTags.find(({subType})=> subType==='countries')?.label
        const sectors = primaryTags.find(({subType})=> subType==='sectors')?.label
        return (
          <tr key={`table-row=${id}-${i}`} className={`${i % 2 == 0 ? 'bg-blue-50': 'bg-white'} border-b`}>
            <td className="px-4 py-3  text-sm font-small text-gray-900 whitespace-nowrap">{additionalInformation[2]}</td>
            <td className="px-4 py-3  text-sm font-small text-gray-900">{title}</td>
            <td className="px-4 py-3  text-sm font-small text-gray-900">{country}</td>
            <td className="px-4 py-3  text-sm font-small text-gray-900">{sectors}</td>
            <td className="px-4 py-3  text-sm font-small text-gray-900">{additionalInformation[0]}</td>
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}
export default Table