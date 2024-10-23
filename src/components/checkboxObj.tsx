"use client"
 
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "./ui/label"

interface props {
    nametag: string
}
 
export function CheckboxDemo(props:props) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {props.nametag}
      </Label>
      <br/>
    </div>
  )
}