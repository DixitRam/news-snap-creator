
export interface NewsData {
  headline: string;
  subheading: string;
  content: string;
  date: string;
  images: string[];
  templateType: "standard" | "event" | "announcement" | "police";
}
