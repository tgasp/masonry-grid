import { useNavigate } from "react-router-dom";

export function PhotoError() {
  const navigate = useNavigate();

  return (
    <div className="text-center py-12">
      <p className="text-red-600 mb-6 text-lg">
        Failed to load photo. Please try again later.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-all shadow-md hover:shadow-lg"
      >
        Back to Gallery
      </button>
    </div>
  );
}