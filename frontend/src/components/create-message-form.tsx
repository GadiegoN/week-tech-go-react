import { ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { createMessage } from "@/http/create-message"

export function CreateMessageForm() {
    const { roomId } = useParams()

    if (!roomId) {
        throw new Error("Messages components must be used within room page.")
    }

    async function createMessageAction(data: FormData) {
        const message = data.get('message')?.toString()

        if (!message || !roomId) {
            return
        }

        try {
            await createMessage({ message, roomId })
        } catch {
            toast.error("Falha ao enviar pergunta. Tente novamente!")
        }
    }

    return (
        <form
            action={createMessageAction}
            className="flex items-center gap-2 rounded-xl border-2 ring-primary ring-offset-2 ring-offset-background focus-within:ring-1"
        >
            <Input required name="message" type="text" placeholder="Qual a sua pergunta?" autoComplete="off" className="" />
            <Button size="sm">
                Criar pergunta
                <ArrowRight className="size-4" />
            </Button>
        </form>
    )
}