import { Download, Heart, Share2 } from "lucide-react";
import { PexelsPhoto } from "@/types/pexels";
import { CircleButton } from "@/components/ui/CircleButton";

interface PhotoActionsProps {
  photo: PexelsPhoto;
}

export function PhotoActions({ photo }: PhotoActionsProps) {
  return (
    <div className="absolute top-4 right-4 z-10 flex space-x-2">
      <CircleButton title="Like photo">
        <Heart className={`h-5 w-5 ${photo.liked ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
      </CircleButton>

      <CircleButton
        href={photo.src.original}
        download
        target="_blank"
        rel="noopener noreferrer"
        title="Download original"
      >
        <Download className="h-5 w-5 text-gray-700" />
      </CircleButton>

      <CircleButton title="Share photo">
        <Share2 className="h-5 w-5 text-gray-700" />
      </CircleButton>
    </div>
  );
}