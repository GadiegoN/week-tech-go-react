import { useParams } from "react-router-dom"
import logo from "@/assets/logo.svg"
import { Button } from "@/components/ui/button"
import { ArrowRight, Share2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Message } from "@/components/message"

export function Room() {

    const { roomId } = useParams()

    function handleShareRoom() {
        const url = window.location.href.toString()

        if (navigator.share !== undefined && navigator.canShare()) {
            navigator.share({ url })

        } else {
            navigator.clipboard.writeText(url)
            toast.info("Link copiado com sucesso.")
        }

    }

    function handleCreateComment() {
        console.log("comment")
    }

    return (
        <div className="mx-auto max-w-2xl flex flex-col gap-6 py-10 px-4">
            <div className="flex items-center gap-3 px-3">
                <img src={logo} alt="logo" className="h-5" />
                <span className="text-sm text-zinc-500 truncate">
                    Código da sala:
                    <span className="text-zinc-300"> {roomId}</span>
                </span>

                <Button size="sm" variant="secondary" className="ml-auto" type="button" onClick={handleShareRoom}>
                    Compartilhar
                    <Share2 size={18} />
                </Button>
            </div>

            <div className="h-px w-full bg-secondary" />

            <form
                action={handleCreateComment}
                className="flex items-center gap-2 rounded-xl border-2 ring-primary ring-offset-2 ring-offset-background focus-within:ring-1"
            >
                <Input name="theme" type="text" placeholder="Qual a sua pergunta?" autoComplete="off" className="" />
                <Button size="sm">
                    Criar pergunta
                    <ArrowRight className="size-4" />
                </Button>
            </form>

            <ol className="list-decimal list-outside px-3 space-y-8">
                <Message
                    text="Como funcionam as goroutines em GoLang e por que elas são importantes para a concorrência e paralelismo?"
                    amountOfReactions={10}
                    answered
                />
                <Message
                    text="Como funcionam as goroutines em GoLang e por que elas são importantes para a concorrência e paralelismo?"
                    amountOfReactions={10}
                />
            </ol>
        </div>
    )
}