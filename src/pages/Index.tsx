import { useState } from "react";
import NewsTemplateForm from "@/components/NewsTemplateForm";
import NewsTemplatePreview from "@/components/NewsTemplatePreview";
import Header from "@/components/Header";
import { NewsData } from "@/types/newsTypes";
import { format } from "date-fns";

const Index = () => {
  const [newsData, setNewsData] = useState<NewsData>({
    headline: "",
    headlineColor: "#000000",
    headlineFontSize: "text-2xl", // Default font size
    subheading: "",
    subheadingColor: "#000000",
    subheadingFontSize: "text-lg", // Default font size
    content: "",
    contentFontSize: "text-base", // Default font size
    date: format(new Date(), "dd-MM-yy"),
    images: [],
    templateType: "standard",
    reporterName: "જીતુ પરમાર માંગરોળ" // Default reporter name
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
