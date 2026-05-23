import React from "react";
import Generate from "@/components/features/generator/generate";
import MobileHeader from "@/components/universal/mobileheader";

export default function GenerationPage() {
  return (
    <>
      <MobileHeader pageTitle="Generator" backEnabled={false} />

      <Generate />
    </>
  );
}
