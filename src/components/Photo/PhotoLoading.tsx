import { Loader2 } from "lucide-react";

export function PhotoLoading() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Loader2 className="h-12 w-12 text-primary animate-spin" />
    </div>
  );
}