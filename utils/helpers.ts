export const sortingTypes = [
  {label:"Signature Date", value: "date"},
  {label:"Title", value: "title"},
  {label:"Country", value: "country"},
  {label:"Sector", value: "sector"},
  {label:"Signed Amount", value: "amount"}
];

export const generateYearsOptions = (minVal:string) =>{
  const years = []
  const max = new Date().getFullYear();
  const min = Number(minVal) || max-10
  for (var i = max; i >= min; i--) {
    years.push({label: String(i), value: String(i)})
  }
  return years
}

export const arrayFromMax = (max=1)=>Array.from({length: max}, (_, i) => i + 1)