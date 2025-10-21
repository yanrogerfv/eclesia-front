import { ChevronLeft } from "lucide-react";

export default function BackButton() {
    return (
        <p onClick={() => { history.back() }} className="w-auto text-4xl justify-center items-center p-2 cursor-pointer border border-primary/50 hover:bg-secondary hover:text-black rounded-lg">
            <ChevronLeft className="md:size-10 size-5" />
        </p>
    );
}