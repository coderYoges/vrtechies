import React from "react";
import AnimatedLogo from "../../../components/animatedLogo";
import { COLORS, COMPANY_NAME } from "../../../config";

const StackedBranding = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 select-none">
      <AnimatedLogo
        mainColor="var(--color-primary)"
        secondaryColor={COLORS.NAVBAR_TEXT_PRIMARY}
      />
      <div className="flex text-lg md:text-xl font-bold tracking-tight leading-none">
        <span style={{ color: "var(--color-primary)" }}>
          {COMPANY_NAME.FIRSTNAME}
        </span>
        <span style={{ color: COLORS.NAVBAR_TEXT_PRIMARY }}>
          {COMPANY_NAME.LASTNAME}
        </span>
      </div>
    </div>
  );
};

export default StackedBranding;