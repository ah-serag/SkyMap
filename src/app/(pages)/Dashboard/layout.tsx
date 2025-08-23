import { ReactNode } from "react";
import HeadDash from "@/app/components/HeadDash";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default layout;
