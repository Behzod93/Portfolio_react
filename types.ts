
export interface Comment {
  id: string;
  name: string;
  text: string;
  date: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  link?: string;
}

export interface Experience {
  year: string;
  title: string;
  company: string;
  description: string;
}
