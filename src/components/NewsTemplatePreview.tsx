
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
          stripBg: "bg-yellow-400"
        };
      case "announcement":
        return {
          mainBg: "bg-blue-50",
          borderColor: "border-blue-500",
          headerBg: "from-blue-600 to-blue-700",
          stripBg: "bg-blue-400"
        };
      case "police":
        return {
          mainBg: "bg-gray-100",
          borderColor: "border-gray-700",
          headerBg: "from-gray-700 to-gray-800",
          stripBg: "bg-gray-400"
        };
      default:
        return {
          mainBg: "bg-white",
          borderColor: "border-red-500",
          headerBg: "from-red-600 to-red-700",
          stripBg: "bg-red-400"
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
            <div className={`bg-gradient-to-r ${templateStyle.headerBg} text-white p-3 flex justify-between items-center shadow-md`}>
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-full h-14 w-14 flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
                  <img 
                    src="https://instagram.fjga1-1.fna.fbcdn.net/v/t51.2885-19/403908255_1677328472793460_3179481571731453175_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fjga1-1.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QHOXjOM5N0ksqePGC4OzpMZdz4X2p8qPU6ncYdt-OXY-6oZQO9vvnOEYsflMfmpJ4NzpSd9ytZhWs4gPSSOuMs7&_nc_gid=dF1ffrwOHYCMsdHYAEBFag&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfLyk0ytsD3sifFOGnsCZTf6EaURrDgVSVELxldQjbFLWA&oe=6829FC0D&_nc_sid=8b3546" 
                    alt="Girnar Sandesh Logo" 
                    className="h-12 w-12 object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold drop-shadow-sm" style={{ color: newsData.subheadingColor || 'white' }}>
                    સોરઠ ગિરનાર થી પ્રસિદ્ધ થતું સમાચાર પત્ર
                  </div>
                  <div className="text-3xl font-bold drop-shadow-sm tracking-wide" style={{ color: newsData.headlineColor || 'white' }}>
                    ગિરનાર સંદેશ
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium drop-shadow-sm">
                <div>RNI NO.GUJGUJ/2023/86250</div>
                <div>Date:- {newsData.date}</div>
              </div>
            </div>
            
            {/* Brown bar */}
            <div className="bg-amber-900 text-white py-1.5 px-3 text-sm flex justify-between items-center shadow-sm">
              <div className="font-medium">તંત્રી : મિલન એન.બારડ</div>
              <div className="flex items-center gap-1">
                <span className="text-base">📱</span> 8000124324
              </div>
            </div>
            
            {/* News Content */}
            <div className="p-4 md:p-5">
              {/* Headline */}
              {newsData.headline && (
                <div className="mb-4 text-center">
                  <h2 
                    className="text-2xl md:text-3xl font-bold pb-2"
                    style={{ color: newsData.headlineColor || 'black' }}
                  >
                    {newsData.headline}
                  </h2>
                  <div className={`h-1.5 mx-auto w-3/4 ${templateStyle.stripBg} rounded-sm`}></div>
                </div>
              )}
              
              {/* Images */}
              {newsData.images.length > 0 && (
                <div className={`grid gap-3 mb-4 ${
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
                      } h-52 overflow-hidden rounded-lg border-2 ${templateStyle.borderColor} shadow-md`}
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
                <h3 
                  className="text-xl font-semibold mb-3 underline decoration-2 decoration-gray-400"
                  style={{ color: newsData.subheadingColor || 'black' }}
                >
                  {newsData.subheading}
                </h3>
              )}
              
              {/* Content */}
              {newsData.content && (
                <p className="text-base leading-relaxed border-l-4 pl-3 py-1 border-gray-300">{newsData.content}</p>
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
