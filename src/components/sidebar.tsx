import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ListFilter } from "lucide-react"
import { CheckboxDemo } from "./checkboxObj"
import { Instrumento } from "./apiObjects"

interface props {
    instrumentos : Instrumento[]
}

export function SheetDemo(props: props) {
    return (
      <Sheet>
        <SheetTrigger asChild>
        <ListFilter
          className="w-auto text-4xl justify-center size-9 p-1 cursor-pointer outline outline-1 outline-teal-500/45 hover:bg-teal-500 hover:text-black rounded-md
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filtrar Levitas</SheetTitle>
            <SheetDescription>
              Filtre os Levitas por instrumento.
            </SheetDescription>
          </SheetHeader>
          <div className="flex">
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div> */}
            <div className="flex">
              {/* <Label htmlFor="username" className="text-right">
                Username
              </Label> */}
              {props.instrumentos.map((instrumento) => (
                <>
                    <CheckboxDemo nametag={instrumento.nome}/>
                    <br/>
                </>
              ))}
              
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
  }