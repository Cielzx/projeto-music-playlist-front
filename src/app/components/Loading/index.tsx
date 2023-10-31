import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";

const Loading = () => {
  return (
    <main className="min-h-screen flex items-center justify-center backgroundDash text-white">
      <Spinner className="w-[230px] h-[230px]" color="white" />
    </main>
  );
};

export default Loading;
