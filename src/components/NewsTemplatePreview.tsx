
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
        return "bg-yellow-50 border-yellow-500";
      case "announcement":
        return "bg-blue-50 border-blue-500";
      case "police":
        return "bg-gray-50 border-gray-500";
      default:
        return "bg-white border-red-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md p-4 overflow-hidden bg-white">
          <div 
            ref={previewRef} 
            className={`border-2 rounded overflow-hidden shadow-lg ${getTemplateStyle()}`}
            style={{ width: "800px", maxWidth: "100%", height: "auto" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/logo-placeholder.png" 
                    alt="Girnar Sandesh Logo" 
                    className="h-10 w-10"
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold">સોરઠ ગિરનાર થી પ્રસિદ્ધ થતું સમાચાર પત્ર</div>
                  <div className="text-2xl font-bold">ગિરનાર સંદેશ</div>
                </div>
              </div>
              <div className="text-sm">
                RNI NO.GUJGUJ/2023/86250 Date:- {newsData.date}
              </div>
            </div>
            
            {/* Brown bar */}
            <div className="bg-amber-800 text-white p-1 text-xs flex justify-between items-center">
              <div>તંત્રી : મિલન એન.બારડ</div>
              <div className="flex items-center">
                <span className="mr-1">📱</span> 8000124324
              </div>
            </div>
            
            {/* News Content */}
            <div className="p-3">
              {/* Headline */}
              {newsData.headline && (
                <h2 className="text-2xl font-bold mb-3">{newsData.headline}</h2>
              )}
              
              {/* Images */}
              {newsData.images.length > 0 && (
                <div className={`grid gap-2 mb-4 ${
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
                      } h-48 overflow-hidden rounded`}
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
                <h3 className="text-xl font-semibold mb-2">{newsData.subheading}</h3>
              )}
              
              {/* Content */}
              {newsData.content && (
                <p className="text-base leading-relaxed">{newsData.content}</p>
              )}
              
              {/* Footer */}
              <div className="text-sm text-right mt-6 text-red-600">
                <p>રિપોર્ટર-જીતુ પરમાર માંગરોળ</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={downloadTemplate} 
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          <Download className="mr-2 h-4 w-4" /> Download Template
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsTemplatePreview;
