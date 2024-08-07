import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface MessageProps {
    text: string
    amountOfReactions: number
    answered?: boolean
}

export function Message({ amountOfReactions, text, answered = false }: MessageProps) {

    const [hasReacted, setHasReacted] = useState(false)

    function handleReactToMessage() {
        setHasReacted(!hasReacted)
    }

    return (
        <li data-answered={answered} className="ml-4 leading-relaxed data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none">
            {text}
            <br />
            <Button onClick={handleReactToMessage} type="button" size="sm" variant={hasReacted ? "secondary" : "ghost"}>
                <ArrowUp size={16} />
                Curtir pergunta ({amountOfReactions})
            </Button>
        </li>
    )
}