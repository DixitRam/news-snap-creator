
import Header from "@/components/Header";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Templates = () => {
  const templateOptions = [
    {
      id: "standard",
      name: "Standard News",
      description: "Default news template with headline, text and images",
      image: "/template-standard.png",
    },
    {
      id: "event",
      name: "Event Coverage",
      description: "Template optimized for event reporting and coverage",
      image: "/template-event.png",
    },
    {
      id: "announcement",
      name: "Announcement",
      description: "For important announcements and notices",
      image: "/template-announcement.png",
    },
    {
      id: "police",
      name: "Police News",
      description: "Template for police and crime-related news",
      image: "/template-police.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Choose a Template</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templateOptions.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <img
                  src={template.image}
                  alt={template.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">{template.name}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </CardContent>
              <CardFooter>
                <Link to={`/?template=${template.id}`} className="w-full">
                  <Button className="w-full">Use Template</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
