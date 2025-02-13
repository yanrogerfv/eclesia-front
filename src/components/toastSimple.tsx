"use client"

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export function ToastSimple() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "Your message has been sent.",
        })
      }}
    >
      Show Toast
    </Button>
  )
}
