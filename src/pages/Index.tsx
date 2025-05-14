
import { useState } from "react";
import NewsTemplateForm from "@/components/NewsTemplateForm";
import NewsTemplatePreview from "@/components/NewsTemplatePreview";
import Header from "@/components/Header";
import { NewsData } from "@/types/newsTypes";

const Index = () => {
  const [newsData, setNewsData] = useState<NewsData>({
    headline: "",
    subheading: "",
    content: "",
    date: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }),
    images: [],
    templateType: "standard",
    headlineColor: "#000000",  // Default to black
    subheadingColor: "#000000", // Default to black
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <NewsTemplateForm newsData={newsData} setNewsData={setNewsData} />
          </div>
          <div className="lg:w-1/2">
            <NewsTemplatePreview newsData={newsData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
