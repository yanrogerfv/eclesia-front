import { Levita } from "@/lib/apiObjects";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


interface SelectLevitaProps {
    value?: string;
    instrumentoNome: string;
    message?: string;
    setLevitaInInstrumento: React.Dispatch<React.SetStateAction<string>>;
    filteredLevitas: Levita[] | undefined;
    alreadySelectedLevitaIds: string[];
    disableFields: boolean;
}

export default function SelectLevita({value, instrumentoNome, message, setLevitaInInstrumento, filteredLevitas, alreadySelectedLevitaIds, disableFields }: SelectLevitaProps) {
    // Filter out levitas that are already selected in other instruments (but keep the current value)
    const availableLevitas = filteredLevitas?.filter(levita => 
        levita.id === value || !alreadySelectedLevitaIds.includes(levita.id)
    );

    return (
        <div className="w-full space-y-1 my-2">
            <Label>{instrumentoNome}</Label>
            <Select value={value} onValueChange={(value) => setLevitaInInstrumento(value)} disabled={disableFields}>
                <SelectTrigger>
                    <SelectValue placeholder={message ? message : `Escolha um levita para tocar ${instrumentoNome.toLowerCase()}.`} />
                </SelectTrigger>
                <SelectContent>
                    {availableLevitas && availableLevitas.length != 0 &&
                        <>
                            {availableLevitas.map((levita) => (
                                <SelectItem disabled={value == levita.id} value={levita.id} key={levita.id} onSelect={() => setLevitaInInstrumento(levita.id)}>{levita.nome}</SelectItem>
                            ))}
                        </>
                    }
                    <SelectItem value={"null"} onSelect={() => setLevitaInInstrumento("")} className="text-zinc-400">Sem {instrumentoNome.toLowerCase()} disponível</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}