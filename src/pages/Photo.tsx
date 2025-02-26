import { useParams } from "react-router-dom";
import { pexelsService } from "@/services/pexels";
import { useQuery } from "@tanstack/react-query";
import { PexelsPhoto } from "@/types/pexels";
import {
  BackToGallery,
  PhotoLoading,
  PhotoError,
  PhotoImage,
  PhotoInfo,
  PhotoDetails,
  PhotoActionButtons,
} from "@/components/Photo";

export default function Photo() {
  const { id } = useParams();

  const {
    data: photo,
    isLoading,
    error,
  } = useQuery<PexelsPhoto>({
    queryKey: ["photo", id],
    queryFn: () => {
      return pexelsService.getPhotoById(id!);
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <PhotoLoading />;
  }

  if (error || !photo) {
    return <PhotoError />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50/50">
      <BackToGallery />

      <div className="bg-white rounded-xl overflow-hidden shadow-xl transition-all hover:shadow-2xl border border-gray-100">
        <PhotoImage photo={photo} />
        
        <div className="p-6 sm:p-8">
          <PhotoInfo photo={photo} />
          <PhotoDetails photo={photo} />
          <PhotoActionButtons photo={photo} />
        </div>
      </div>
    </div>
  );
}
