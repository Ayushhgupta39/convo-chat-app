"use client";

import { SkeletonCircle, Stack } from "@chakra-ui/react";

const Skeleton = () => {
  return (
    <div>
      <Stack>
        <SkeletonCircle height="20px" />
      </Stack>
    </div>
  );
};

export default Skeleton;
