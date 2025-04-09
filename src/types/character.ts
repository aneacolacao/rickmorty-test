export interface Character {
  id: number;
  name: string;
  image: string;
  gender: string;
  status: string;
  species: string;
  type: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  episode: string[];
}
