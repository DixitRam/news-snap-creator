
import { ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { NewsData } from "@/types/newsTypes";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface NewsTemplateFormProps {
  newsData: NewsData;
  setNewsData: React.Dispatch<React.SetStateAction<NewsData>>;
}

// Predefined color options
const textColorOptions = [
  { value: "#000000", label: "Black", class: "bg-black" },
  { value: "#FFFFFF", label: "White", class: "bg-white border border-gray-300" },
  { value: "#FF0000", label: "Red", class: "bg-red-600" },
  { value: "#0000FF", label: "Blue", class: "bg-blue-600" },
  { value: "#006400", label: "Dark Green", class: "bg-green-800" },
  { value: "#800000", label: "Maroon", class: "bg-red-900" },
  { value: "#FFA500", label: "Orange", class: "bg-orange-500" },
  { value: "#4B0082", label: "Indigo", class: "bg-indigo-900" },
  { value: "#800080", label: "Purple", class: "bg-purple-800" },
];

const NewsTemplateForm = ({ newsData, setNewsData }: NewsTemplateFormProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewsData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: "standard" | "event" | "announcement" | "police") => {
    setNewsData((prev) => ({ ...prev, templateType: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => 
        URL.createObjectURL(file)
      );
      
      setNewsData((prev) => ({
        ...prev,
        images: [...prev.images, ...filesArray].slice(0, 4)  // Limit to 4 images
      }));
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setNewsData((prev) => ({
        ...prev,
        date: format(date, "dd-MM-yy")
      }));
    }
  };

  const handleColorChange = (colorType: "headlineColor" | "subheadingColor", value: string) => {
    setNewsData((prev) => ({
      ...prev,
      [colorType]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create News Template</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="headline">Headline</Label>
          <Input
            id="headline"
            name="headline"
            placeholder="Enter main headline"
            value={newsData.headline}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Palette className="h-4 w-4" /> Headline Color
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {textColorOptions.map((color) => (
              <Button
                key={color.value}
                type="button"
                variant="outline"
                className={cn(
                  "h-8 w-full border-2",
                  newsData.headlineColor === color.value ? "ring-2 ring-primary" : ""
                )}
                onClick={() => handleColorChange("headlineColor", color.value)}
              >
                <span className={`h-4 w-4 rounded-full ${color.class}`} />
                <span className="ml-2 text-xs">{color.label}</span>
              </Button>
            ))}
            <Input
              type="color"
              value={newsData.headlineColor}
              onChange={(e) => handleColorChange("headlineColor", e.target.value)}
              className="h-8 cursor-pointer"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subheading">Subheading</Label>
          <Input
            id="subheading"
            name="subheading"
            placeholder="Enter subheading"
            value={newsData.subheading}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Palette className="h-4 w-4" /> Subheading Color
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {textColorOptions.map((color) => (
              <Button
                key={color.value}
                type="button"
                variant="outline"
                className={cn(
                  "h-8 w-full border-2",
                  newsData.subheadingColor === color.value ? "ring-2 ring-primary" : ""
                )}
                onClick={() => handleColorChange("subheadingColor", color.value)}
              >
                <span className={`h-4 w-4 rounded-full ${color.class}`} />
                <span className="ml-2 text-xs">{color.label}</span>
              </Button>
            ))}
            <Input
              type="color"
              value={newsData.subheadingColor}
              onChange={(e) => handleColorChange("subheadingColor", e.target.value)}
              className="h-8 cursor-pointer"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="content">News Content</Label>
          <Textarea
            id="content"
            name="content"
            placeholder="Enter news content"
            rows={5}
            value={newsData.content}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {newsData.date ? (
                  newsData.date
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={new Date()}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="template">Template Style</Label>
          <Select value={newsData.templateType} onValueChange={handleSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard News</SelectItem>
              <SelectItem value="event">Event Coverage</SelectItem>
              <SelectItem value="announcement">Announcement</SelectItem>
              <SelectItem value="police">Police News</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="images">Upload Images (max 4)</Label>
          <Input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="cursor-pointer"
          />
          <div className="grid grid-cols-2 gap-2 mt-2">
            {newsData.images.map((img, index) => (
              <div key={index} className="relative h-24 border rounded-md overflow-hidden">
                <img 
                  src={img} 
                  alt={`Uploaded ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <Button 
                  variant="destructive" 
                  size="sm"
                  className="absolute top-1 right-1 h-6 w-6 p-0"
                  onClick={() => {
                    setNewsData(prev => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== index)
                    }));
                  }}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsTemplateForm;
