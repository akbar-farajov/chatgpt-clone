import { LoaderCircle } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center gap-2">
      Loading... <LoaderCircle className="size-4 animate-spin" />
    </div>
  );
};

export default Loading;
