import { Levita } from "@/lib/apiObjects";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


interface SelectLevitaProps {
    value?: string;
    instrumentoNome: string;
    setLevitaInInstrumento: React.Dispatch<React.SetStateAction<string>>;
    filterByInstrumento: (instrumento: number) => Levita[] | undefined;
    instrumento: number;
    disableFields: boolean;
}

export default function SelectLevita({value, instrumentoNome, setLevitaInInstrumento, filterByInstrumento, instrumento, disableFields }: SelectLevitaProps) {
    return (
        <div className="w-full space-y-1 my-2">
            <Label>{instrumentoNome}</Label>
            <Select value={value} onValueChange={(value) => setLevitaInInstrumento(value)} disabled={disableFields}>
                <SelectTrigger>
                    <SelectValue placeholder={`Escolha um levita para tocar ${instrumentoNome.toLowerCase()}.`} />
                </SelectTrigger>
                <SelectContent>
                    {filterByInstrumento(instrumento)?.length != 0 ?
                        <>
                            {filterByInstrumento(instrumento)?.map((levita) => (
                                <SelectItem value={levita.id} key={levita.id} onSelect={() => setLevitaInInstrumento(levita.id)}>{levita.nome}</SelectItem>
                            ))}
                        </>
                        :
                        <SelectItem value={"null"} onSelect={() => setLevitaInInstrumento("")} className="text-zinc-400">
                            Sem {instrumentoNome.toLowerCase()} disponível para esta data</SelectItem>
                    }
                    <SelectItem value={"null"} onSelect={() => setLevitaInInstrumento("")} className="text-zinc-400">Sem {instrumentoNome.toLowerCase()}</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}