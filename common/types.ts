export type Tag = {
  type: string;
  subType: string;
  label: string;
  value: string;
}
export type SeedDataObject =   {
  id: string,
  url: string,
  urlType: null,
  type: string,
  subType: string,
  title: string,
  description: string,
  logo: null,
  imageId: null,
  overlayType: null,
  imageType: null,
  startDate: number,
  endDate: null,
  featured: false,
  campaign: null,
  primaryTags: Tag,
  secondaryTags: null,
  authors: null,
  city: null,
  country: null,
  additionalInformation: Array<string | number >,
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