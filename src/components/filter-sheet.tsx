import { Button } from "@/components/ui/button"
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
import { Instrumento } from "@/lib/apiObjects"
import { Checkbox } from "./ui/checkbox"

interface props {
  filteredInstruments: Instrumento[],
  setFilteredInstruments: (instruments: Instrumento[]) => void,
  instrumentos: Instrumento[] | undefined,
  disabled: boolean
}

export function SheetFiltroLevita(props: props) {
  function addInstrumentoInFilter(instrumento: Instrumento) {
		props.setFilteredInstruments([...props.filteredInstruments, instrumento])
	}
	function removeInstrumentoInFilter(instrumento: Instrumento) {
		props.setFilteredInstruments(props.filteredInstruments.filter((filteredInstrument) => filteredInstrument.id !== instrumento.id))
	}
  const { filteredInstruments, setFilteredInstruments, instrumentos, disabled } = props
  return (
      <Sheet>
        <SheetTrigger asChild>
          {filteredInstruments.length == 0 ?
            <ListFilter className="w-auto text-4xl justify-center size-[2.4rem] p-2 cursor-pointer border hover:bg-secondary/80 hover:text-black rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" /> :
            <ListFilter onClick={() => setFilteredInstruments([])}
              className="w-auto text-4xl justify-center size-[2.4rem] p-2 cursor-pointer border outline-red-500/45 hover:bg-red-500 hover:text-black rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
          }
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="mb-4">
            <SheetTitle>Filtrar Levitas</SheetTitle>
            <SheetDescription>
              Filtre os Levitas por instrumento.
            </SheetDescription>
          </SheetHeader>
          <div className="grid space-y-1 mb-4">
            {instrumentos?.map((instrumento) => (
              <div key={instrumento.id} className="flex items-center space-x-2">
                <Checkbox id={"instrumento-" + instrumento.id} onClick={() => {
                  if (filteredInstruments.some((filteredInstrument) => filteredInstrument.id === instrumento.id)) {
                    removeInstrumentoInFilter(instrumento)
                  } else {
                    addInstrumentoInFilter(instrumento)
                  }
                }} />
                <Label
                  htmlFor={"instrumento-" + instrumento.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {instrumento.nome}
                </Label>
              </div>
            ))}
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Salvar</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      )
  }