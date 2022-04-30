export type Tag = {
  type: string;
  subType: string;
  label: string;
  value: string;
}
export type SelectOption= {
  label: string;
  value: string;
}
export type BaseProject = {
  id: string;
  primaryTags: Array<Tag>;
  title: string;
  additionalInformation: Array<string | number>;
  startDate: string;
}

export type Project ={
  id: string;
  primaryTags: Array<Tag>;
  title: string;
  additionalInformation: Array<string | number>;
  date: string ;
  amount: number ;
  humanDate: string;
  country: string ;
  sector: string ;
  region: string ;
  startDate: string;
  startYear: string ;
}

export type Projects = {
  items: Array<Project>;
  total: Number;
  totalPages: Number;
}