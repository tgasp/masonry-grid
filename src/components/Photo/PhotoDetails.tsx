import { Info, Image as ImageIcon } from "lucide-react";
import { PexelsPhoto } from "@/types/pexels";

interface PhotoDetailsProps {
  photo: PexelsPhoto;
}

export function PhotoDetails({ photo }: PhotoDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="space-y-4">
        <div className="flex items-start">
          <ImageIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
          <div>
            <h3 className="font-medium text-gray-900">Dimensions</h3>
            <p className="text-gray-600">{photo.width} × {photo.height} px</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Info className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
          <div>
            <h3 className="font-medium text-gray-900">ID</h3>
            <p className="text-gray-600">{photo.id}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center h-10">
          <div 
            className="h-6 w-6 rounded-full mr-2" 
            style={{ backgroundColor: photo.avg_color }}
          />
          <div className="text-gray-900">
            <h3 className="font-medium text-gray-900">Average Color</h3>
            <p className="text-gray-600">{photo.avg_color}</p>
          </div>
        </div>
      </div>
    </div>
  );
}