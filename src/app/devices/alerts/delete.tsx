import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
import { useState } from "react"


interface ConfirmDeletionAlertProps extends React.PropsWithChildren {
    handler: () => Promise<void>
}

const ConfirmDeletionAlert = ({ children, handler }: ConfirmDeletionAlertProps) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)


    const handleClick = async () => {
        await handler()
        setOpen(false)
        router.refresh()
    }

    return <AlertDialog open={open}>
        <AlertDialogTrigger onClick={() => setOpen(true)}>{children}</AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    <strong>All sensor associated sensor readings will be deleted.</strong> This action cannot be undone.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-600r" onClick={handleClick}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

}

export default ConfirmDeletionAlert