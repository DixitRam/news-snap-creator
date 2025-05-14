import { useRef, useMemo } from "react";
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

  // Calculate dynamic styles based on content length only for image sizing
  const dynamicStyles = useMemo(() => {
    // Calculate content length (headline + subheading + content)
    const contentLength = 
      (newsData.headline?.length || 0) + 
      (newsData.subheading?.length || 0) + 
      (newsData.content?.length || 0);
    
    // Calculate image count
    const imageCount = newsData.images?.length || 0;
    
    // Adjust image heights based on content length and image count
    let imageHeight = 'h-40';
    if (contentLength > 500) {
      imageHeight = imageCount >= 2 ? 'h-24' : 'h-32';
    } else if (contentLength > 300) {
      imageHeight = imageCount >= 2 ? 'h-32' : 'h-40';
    } else {
      imageHeight = imageCount >= 2 ? 'h-36' : 'h-48';
    }
    
    return {
      imageHeight,
      padding: contentLength > 400 ? 'p-2' : 'p-3',
    };
  }, [newsData]);

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
      <CardContent className="p-2 bg-gray-100">
        <div className="border rounded-md p-0 overflow-hidden bg-white shadow-md flex justify-center">
          <div 
            ref={previewRef} 
            className={`border-4 rounded-lg overflow-hidden shadow-xl ${templateStyle.mainBg} ${templateStyle.borderColor} aspect-square flex flex-col`}
              style={{ width: "1080px", maxWidth: "100%" }}
          >
            {/* Header - reduced padding */}
            <div className={`bg-gradient-to-r ${templateStyle.headerBg} text-white p-1 flex justify-between items-center shadow-md`}>
              <div className="flex items-center gap-1">
                <div className="rounded-full h-10 w-10 flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
                  <img 
                    src="/logo.png"
                    alt="Girnar Sandesસંજોગો દરમિયાન રક્તનો જથ્થો પૂરતી માત્રામાં જળવાઇ રહે અને જરુરિયાતમંદો માટે તેની અછત ન સર્જાઇ તેમજ તેમને લોહી મળી રહે તે માટે જૂનાગઢ જિલ્લા કલેકટર કચેરી તેમજ જૂનાગઢ જિલ્લા પંચાયત કચેરીના સંયુકત ઉપક્રમે રક્ત દાન કેમ્પનું આયોજન કરવામાં આવ્યુ હતુ. આ બ્લડ ડોનેશન કેમ્પમાં ૫૪ યુનિટ રકત એકત્ર કરવામાં આવ્યું હતું. 
આ કેમ્પમાં અધિકારીશ્રીઓ અને કર્મચારીશ્રીઓએ ઉત્સાહ સાથે રકતદાન કરી કર્મયોગ સાથે સમાજ અને રાષ્ટ્ર સેવાનો નવો રાહ ચીંધ્યો હતો.બ્લડ ડોનેટ કરનાર 
કર્મયોગીશ્રીઓને સર્ટિફિકેટ આપી જૂનાગઢ જિલ્લા કલેકટરશ્રી અનિલકુમાર રાણાવસિયાએ પ્રોત્સાહિત કર્યા હતા. જૂનાગઢ જિલ્લા કલેકટરશ્રીના માર્ગદર્શન હેઠળ કલેકટર કચેરીના સભાખંડમાં જૂનાગઢ જિલ્લા મુખ્ય આરોગ્ય અધિકારીશ્રીની દેખરેખ હેઠળ યોજવામાં આવેલી આ રકતદાન શિબિરમાં લાઇફલાઇન બ્લડ બેંકનો સહયોગ સાંપડ્યો હતો.આરોગ્ય શાખાના અધિકારીશ્રી, કર્મચારીશ્રીઓએ કેમ્પને સફળ બનાવવા જહેમત ઉઠાવી હતી, એમ જૂનાગઢ જિલ્લા પંચાયત આરોગ્ય શાખા મુખ્ય જિલ્લા આરોગ્ય અધિકારીશ્રીએ એક અખબારી યાદીમાં જણાવ્યુ છેh Logo" 
                    className="h-9 w-9 object-fill"
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold drop-shadow-sm" style={{ color: 'white' }}>
                    સોરઠ ગિરનાર થી પ્રસિદ્ધ થતું સમાચાર પત્ર
                  </div>
                  <div className="text-xl font-bold drop-shadow-sm tracking-wide" style={{ color: 'white' }}>
                    ગિરનાર સંદેશ
                  </div>
                </div>
              </div>
              <div className="text-xs font-medium drop-shadow-sm">
                <div>RNI NO.GUJGUJ/2023/86250</div>
                <div>Date:- {newsData.date}</div>
              </div>
            </div>
            
            {/* Brown bar - reduced height */}
            <div className="bg-amber-900 text-white py-0.5 px-2 text-xs flex justify-between items-center shadow-sm">
              <div className="font-medium">તંત્રી : મિલન એન.બારડ</div>
              <div className="flex items-center gap-1">
                <span className="text-sm">📱</span> 8000124324
              </div>
            </div>
            
            {/* News Content - dynamic padding based on content length */}
            <div className={`${dynamicStyles.padding} flex-grow flex flex-col`}>
              {/* Headline - user selected font size */}
              {newsData.headline && (
                <div className="mb-1 text-center">
                  <h2 
                    className={`${newsData.headlineFontSize || 'text-2xl'} font-bold pb-0.5`}
                    style={{ color: newsData.headlineColor || 'black' }}
                  >
                    {newsData.headline}
                  </h2>
                  <div className={`h-1 mx-auto w-3/4 ${templateStyle.stripBg} rounded-sm`}></div>
                </div>
              )}
              
              {/* Images - dynamic height */}
              {newsData.images.length > 0 && (
                <div className={`grid gap-1 mb-2 flex-grow ${
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
                      } ${dynamicStyles.imageHeight} overflow-hidden rounded-lg border-2 ${templateStyle.borderColor} shadow-md relative bg-gray-200`}
                      style={{ position: 'relative' }}
                    >
                      {/* Blurred background image */}
                      <div 
                        className="absolute inset-0 w-full h-full blur-md brightness-60 scale-110" 
                        style={{ 
                          backgroundImage: `url(${img})`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                        }}
                      />
                      
                      {/* Main image with object-fit: contain */}
                      <div className="absolute inset-0 flex items-center justify-center h-full w-full">
                        <img 
                          src={img} 
                          alt={`News ${index + 1}`}
                          className="max-h-full max-w-full object-contain z-10"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Content area */}
              <div className="flex-grow overflow-auto">
                {/* Subheading - user selected font size */}
                {newsData.subheading && (
                  <h3 
                    className={`${newsData.subheadingFontSize || 'text-lg'} font-semibold mb-1 underline decoration-2 decoration-gray-400`}
                    style={{ color: newsData.subheadingColor || 'black' }}
                  >
                    {newsData.subheading}
                  </h3>
                )}
                
                {/* Content - user selected font size */}
                {newsData.content && (
                  <p className={`${newsData.contentFontSize || 'text-base'} leading-tight border-l-4 pl-2 py-0.5 border-gray-300`}>
                    {newsData.content}
                  </p>
                )}
              </div>
              
              {/* Footer - reduced margin */}
              <div className="text-xs text-right mt-1 text-red-700 font-medium italic pr-1">
                <p>રિપોર્ટર-{newsData.reporterName}</p>
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
          <Download className="mr-2 h-4 w-4" /> Download Image
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsTemplatePreview;
