export type OpenApiNaver = {
  lastBuildDate: string;
  startPage: number;
  display: number;
  total: number;
  items: OpenApiNaverItem[];
};

export type OpenApiNaverItem = {
  title: string;
  link: string;
  description: string;
  image: string;
  pubDate: string;
  isbn: string;
};

