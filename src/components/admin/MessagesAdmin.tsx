import { useState } from "react"
import { Trash2, Loader2, Mail, MailOpen, CheckCircle } from "lucide-react"
import { useMessages } from "../../hooks/useMessages"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog"
import type { ContactMessage } from "../../types/database.types"

export default function MessagesAdmin() {
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

    const { messages, isLoading, error, markAsRead, deleteMessage } = useMessages()

    const handleView = async (message: ContactMessage) => {
        setSelectedMessage(message)
        setIsViewDialogOpen(true)
        if (!message.read) {
            await markAsRead(message.id)
        }
    }

    const handleDelete = (message: ContactMessage, e: React.MouseEvent) => {
        e.stopPropagation()
        setSelectedMessage(message)
        setIsDeleteDialogOpen(true)
    }

    const confirmDelete = async () => {
        if (selectedMessage) {
            try {
                await deleteMessage(selectedMessage.id)
            } catch (error) {
                console.error("Error deleting message:", error)
            } finally {
                setIsDeleteDialogOpen(false)
                setIsViewDialogOpen(false)
                setSelectedMessage(null)
            }
        }
    }

    if (error) {
        return (
            <div className="p-4 text-red-500">
                Error: {error}
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-100">Mensajes</h1>

            <div className="grid gap-4">
                {messages?.map((message) => (
                    <Card
                        key={message.id}
                        className={`p-4 bg-[#161b22] border-[#30363d] cursor-pointer transition-colors hover:border-[#58a6ff]/50 ${!message.read ? 'bg-[#161b22] border-l-4 border-l-[#58a6ff]' : ''
                            }`}
                        onClick={() => handleView(message)}
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex items-start gap-3">
                                <div className={`mt-1 ${!message.read ? 'text-[#58a6ff]' : 'text-gray-500'}`}>
                                    {!message.read ? <Mail className="w-5 h-5" /> : <MailOpen className="w-5 h-5" />}
                                </div>
                                <div>
                                    <h3 className={`font-medium ${!message.read ? 'text-gray-100' : 'text-gray-400'}`}>
                                        {message.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{message.email}</p>
                                    <p className="text-sm text-gray-400 mt-1 line-clamp-1">{message.message}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">
                                    {new Date(message.created_at).toLocaleDateString()}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                                    onClick={(e) => handleDelete(message, e)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {isLoading && (
                <div className="flex justify-center">
                    <Loader2 className="w-6 h-6 animate-spin" />
                </div>
            )}

            {/* Dialog para ver mensaje completo */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="bg-[#161b22] border-[#30363d] text-gray-100">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-gray-100">
                            <MailOpen className="w-5 h-5 text-[#58a6ff]" />
                            Mensaje de {selectedMessage?.name}
                        </DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Recibido el {selectedMessage && new Date(selectedMessage.created_at).toLocaleString()}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                        <div className="p-3 rounded bg-[#0d1117] border border-[#30363d]">
                            <p className="text-sm text-gray-500 mb-1">Email</p>
                            <p className="text-gray-200">{selectedMessage?.email}</p>
                        </div>

                        <div className="p-3 rounded bg-[#0d1117] border border-[#30363d]">
                            <p className="text-sm text-gray-500 mb-1">Mensaje</p>
                            <p className="text-gray-200 whitespace-pre-wrap">{selectedMessage?.message}</p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsViewDialogOpen(false)}
                            className="border-[#30363d] text-gray-400 hover:bg-[#30363d] hover:text-gray-100"
                        >
                            Cerrar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => selectedMessage && handleDelete(selectedMessage, { stopPropagation: () => { } } as React.MouseEvent)}
                            className="bg-red-500 hover:bg-red-600 border-transparent"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Eliminar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Dialog de Confirmación de Eliminación */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="bg-[#161b22] text-gray-100 border-[#30363d]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-gray-100">¿Eliminar mensaje?</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-400">
                            Esta acción no se puede deshacer. El mensaje será eliminado permanentemente.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setIsDeleteDialogOpen(false)}
                            className="border-[#30363d] text-gray-400 hover:bg-[#30363d] hover:text-gray-100"
                        >
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-500 hover:bg-red-600 text-white border-transparent"
                        >
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
