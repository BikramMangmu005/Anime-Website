import { LayoutGridIcon } from "lucide-react";
interface SectionTitleProps {
  title: string;
}
const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <h6 className="flex items-center gap-1 text-[18px] font-bold">
      {" "}
      <LayoutGridIcon className="size-5 text-[#4F39F6] sm:size-6" />{" "}
      <span className="font-code">{title}</span>{" "}
    </h6>
  );
};
export default SectionTitle;
