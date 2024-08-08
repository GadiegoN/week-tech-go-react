import { Input } from "@/components/ui/input"
import logo from "../assets/logo.svg"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { createRoom } from "@/http/create-room"
import { toast } from "sonner"

export function CreateRoom() {

    const navigate = useNavigate()

    async function handleCreateRoom(data: FormData) {
        const theme = data.get('theme')?.toString()

        if (!theme) {
            return
        }

        try {
            const { roomId } = await createRoom({ theme })

            navigate(`/room/${roomId}`)
        } catch {
            toast.error("Falha ao criar sala")
        }
    }

    return (
        <main className="h-screen flex items-center justify-center px-4">
            <div className="max-w-md flex flex-col gap-6">
                <img src={logo} alt="logo" className="h-10" />

                <p className="leading-relaxed text-zinc-300">
                    Crie uma sala pública de AMA (Ask me anything) e priorize as perguntas mais importantes para a comunidade.
                </p>

                <form
                    action={handleCreateRoom}
                    className="flex items-center gap-2 rounded-xl border-2 ring-primary ring-offset-2 ring-offset-background focus-within:ring-1"
                >
                    <Input required name="theme" type="text" placeholder="Nome da sala" autoComplete="off" className="" />
                    <Button size="sm">
                        Criar sala
                        <ArrowRight className="size-4" />
                    </Button>
                </form>
            </div>
        </main>
    )
}