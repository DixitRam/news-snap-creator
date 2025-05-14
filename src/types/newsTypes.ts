export interface NewsData {
  headline: string;
  headlineColor: string;
  headlineFontSize: string;
  subheading: string;
  subheadingColor: string;
  subheadingFontSize: string;
  content: string;
  contentFontSize: string;
  date: string;
  templateType: "standard" | "event" | "announcement" | "police";
  images: string[];
  reporterName: string;
}
