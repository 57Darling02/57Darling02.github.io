export type PostDate = string | number | Date;

export interface PostSummary {
  title: string;
  date?: PostDate;
  link: string;
  excerpt: string;
  tags: string[];
  category: string;
  cover: string;
  lastUpdated?: number;
  textNum: number;
}
