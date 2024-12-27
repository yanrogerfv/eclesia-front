import { Card } from "@/components/ui/card";


export default function LoginPage() {

  return (
    <div>
      <Card className=" flex outline outline-1 outline-primary rounded-2xl
      lg:w-[30dvw] lg:h-[80dvh] lg:ml-[60dvw] lg:mr-[10dvw] lg:my-[10dvh] 
      md:w-[40dvw] md:h-[80dvh] md:ml-[30dvw] md:mr-[30dvw] md:my-[10dvh]
      w-4/5 h-[60dvh] mx-[10dvw] my-[5dvh]
      "></Card>
      
      
      
      
      
      
      
      
      
      <Card className="flex outline outline-1 outline-primary rounded-2xl
      lg:hidden md:hidden w-4/5 h-[25dvh] mx-[10dvw] my-[5dvh]
      "></Card>
    </div>
  );
}