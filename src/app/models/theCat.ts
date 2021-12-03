export type TheCat = {
  id: number;
  url: string;
  width: number;
  height: number;
  breeds: Breed[];
};

export type Breed = {
  id: number;
  name: string;
  image: CatImage;
};

export type CatImage = {
  id: number;
  url: string;
  width: number;
  height: number;
};
