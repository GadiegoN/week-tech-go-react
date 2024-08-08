import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { createMessageReaction } from "@/http/create-message-reaction";
import { removeMessageReaction } from "@/http/remove-message-reaction";

interface MessageProps {
    id: string
    text: string
    amountOfReactions: number
    answered?: boolean
}

export function Message({ id: messageId, amountOfReactions, text, answered = false }: MessageProps) {
    const { roomId } = useParams()
    const [hasReacted, setHasReacted] = useState(false)

    if (!roomId) {
        throw new Error("Messages components must be used within room page.")
    }

    async function createMessasgeReactionAction() {
        if (!roomId) {
            return
        }

        try {
            await createMessageReaction({ messageId, roomId })
        } catch {
            toast.error("Falha ao reagir mensagem, tente novamente!")
        }

        setHasReacted(true)
    }

    async function removeMessasgeReactionAction() {
        if (!roomId) {
            return
        }

        try {
            await removeMessageReaction({ messageId, roomId })
        } catch {
            toast.error("Falha ao remover reação da mensagem, tente novamente!")
        }

        setHasReacted(false)
    }

    return (
        <li data-answered={answered} className="ml-4 leading-relaxed data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none">
            {text}
            <br />
            <Button
                onClick={hasReacted ? removeMessasgeReactionAction : createMessasgeReactionAction}
                type="button"
                size="sm"
                variant={hasReacted ? "secondary" : "ghost"}
            >
                <ArrowUp size={16} />
                Curtir pergunta ({amountOfReactions})
            </Button>
        </li>
    )
}