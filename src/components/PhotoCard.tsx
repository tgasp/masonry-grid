import { Link } from "react-router-dom";
import { PexelsPhoto } from "@/types/pexels";

interface PhotoCardProps {
  photo: PexelsPhoto;
  innerRef?: (node: HTMLDivElement | null) => void;
}

export default function PhotoCard({ photo, innerRef }: PhotoCardProps) {
  return (
    <div ref={innerRef}>
      <Link to={`/photo/${photo.id}`} className="block group">
        <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-200">
          <img
            src={photo.src.medium}
            alt={photo.alt || `Photo by ${photo.photographer}`}
            className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
          />
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-900 truncate">
            Photo by {photo.photographer}
          </p>
        </div>
      </Link>
    </div>
  );
}