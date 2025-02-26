import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function BackToGallery() {
  return (
    <Link
      to="/"
      className="inline-flex items-center mb-8 text-sm font-medium text-gray-700 hover:text-primary transition-all group"
    >
      <ArrowLeft className="mr-2 h-5 w-5 transform group-hover:-translate-x-1 transition-transform" />
      Back to Gallery
    </Link>
  );
}