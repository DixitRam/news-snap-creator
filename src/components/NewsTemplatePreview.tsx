
import { useRef } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { NewsData } from "@/types/newsTypes";
import { Download } from "lucide-react";
import { useToast } from "./ui/use-toast";
import html2canvas from "html2canvas";

interface NewsTemplatePreviewProps {
  newsData: NewsData;
}

const NewsTemplatePreview = ({ newsData }: NewsTemplatePreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const downloadTemplate = async () => {
    if (previewRef.current) {
      try {
        toast({
          title: "Generating image...",
          description: "Please wait while we create your news template."
        });

        const canvas = await html2canvas(previewRef.current, {
          scale: 2,
          backgroundColor: null,
          logging: false,
        });
        
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `girnar-sandesh-${new Date().toISOString().slice(0, 10)}.png`;
        link.click();
        
        toast({
          title: "Download complete!",
          description: "Your news template has been saved to your device.",
        });
      } catch (error) {
        console.error("Error generating image:", error);
        toast({
          title: "Error",
          description: "Failed to generate image. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const getTemplateStyle = () => {
    switch (newsData.templateType) {
      case "event":
        return {
          mainBg: "bg-yellow-50",
          borderColor: "border-yellow-500", 
          headerBg: "from-amber-600 to-amber-700",
          stripColor: "bg-yellow-400"
        };
      case "announcement":
        return {
          mainBg: "bg-blue-50",
          borderColor: "border-blue-500",
          headerBg: "from-blue-600 to-blue-700",
          stripColor: "bg-blue-400"
        };
      case "police":
        return {
          mainBg: "bg-gray-100",
          borderColor: "border-gray-700",
          headerBg: "from-gray-700 to-gray-800",
          stripColor: "bg-gray-500"
        };
      default:
        return {
          mainBg: "bg-white",
          borderColor: "border-red-500",
          headerBg: "from-red-600 to-red-700",
          stripColor: "bg-yellow-400"
        };
    }
  };

  const templateStyle = getTemplateStyle();

  return (
    <Card className="shadow-lg">
      <CardHeader className="border-b bg-slate-50">
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent className="p-4 bg-gray-100">
        <div className="border rounded-md p-4 overflow-hidden bg-white shadow-md">
          <div 
            ref={previewRef} 
            className={`border-4 rounded-lg overflow-hidden shadow-xl ${templateStyle.mainBg} ${templateStyle.borderColor}`}
            style={{ width: "800px", maxWidth: "100%", height: "auto" }}
          >
            {/* Header */}
            <div className="bg-amber-50 text-red-600 p-3 border-b-2 border-amber-900">
              <div className="text-center">
                <div className="text-xs font-medium mb-1">સોરઠ ગિરનાર થી પ્રસિદ્ધ થતું સમાચાર પત્ર</div>
                <div className="text-5xl font-bold tracking-wide">ગિરનાર સંદેશ</div>
              </div>
            </div>
            
            {/* Brown header bar with info */}
            <div className="bg-amber-900 text-white py-1.5 px-3 text-sm flex justify-between items-center shadow-sm">
              <div className="font-medium">તંત્રી : મિલન એન.બારડ</div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <span className="text-base">📱</span> 8000124324
                </span>
                <span>
                  RNI NO.GUJGUJ/2023/86250
                </span>
                <span>
                  Date:- {newsData.date}
                </span>
              </div>
            </div>
            
            {/* News Content */}
            <div className="p-4 md:p-5">
              {/* Headline with yellow strip below it */}
              {newsData.headline && (
                <div className="relative mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold mb-1 text-center">{newsData.headline}</h2>
                  <div className={`absolute -bottom-3 left-0 right-0 h-8 ${templateStyle.stripColor} rounded-full transform rotate-[-1deg] -z-10`}></div>
                </div>
              )}
              
              {/* Images */}
              {newsData.images.length > 0 && (
                <div className={`grid gap-3 mb-4 mt-6 ${
                  newsData.images.length === 1 
                    ? 'grid-cols-1' 
                    : newsData.images.length === 2 
                      ? 'grid-cols-2' 
                      : 'grid-cols-2'
                }`}>
                  {newsData.images.map((img, index) => (
                    <div 
                      key={index} 
                      className={`${
                        newsData.images.length === 3 && index === 0 
                          ? 'col-span-2' 
                          : ''
                      } h-52 overflow-hidden rounded-lg border shadow-md`}
                    >
                      <img 
                        src={img} 
                        alt={`News ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {/* Subheading */}
              {newsData.subheading && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2 text-indigo-800">{newsData.subheading}</h3>
                  <div className="h-0.5 w-1/4 bg-indigo-800 mb-3"></div>
                </div>
              )}
              
              {/* Content */}
              {newsData.content && (
                <div className="mt-3">
                  <p className="text-base leading-relaxed">{newsData.content}</p>
                </div>
              )}
              
              {/* Footer */}
              <div className="text-sm text-right mt-6 text-red-700 font-medium italic pr-2">
                <p>રિપોર્ટર-જીતુ પરમાર માંગરોળ</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-slate-50 border-t">
        <Button 
          onClick={downloadTemplate} 
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium"
        >
          <Download className="mr-2 h-4 w-4" /> Download Template
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsTemplatePreview;
