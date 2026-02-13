import AnimatedLogo from "../../../components/animatedLogo";
import { COLORS, COMPANY_NAME } from "../../../config";

const StackedBranding = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 select-none z-50">
      <AnimatedLogo
        mainColor="var(--color-primary)"
        secondaryColor={COLORS.NAVBAR_TEXT_PRIMARY}
      />
      <div className="flex text-lg md:text-xl font-bold tracking-tight leading-none">
        <span className="text-[var(--color-primary)]">
          {COMPANY_NAME.FIRSTNAME}
        </span>
        <span className="text-[#f8fafc]">
          {COMPANY_NAME.LASTNAME}
        </span>
      </div>
    </div>
  );
};

export default StackedBranding;