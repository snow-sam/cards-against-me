"use client"

import { setPlayerCard } from "@/app/actions"

import { useState } from "react"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

type DeckFormProps = {
    playerDeck: string[]
}

const DeckForm = ({ playerDeck }: DeckFormProps) => {
    const [selectedCard, setSelectedCard] = useState<string | null>(null);

    const handleSubmit = (formData: FormData) => {
        const card = formData.get("card") as string | null;
        setSelectedCard(card)
    }

    const handleSendCard = () => {
        setPlayerCard(selectedCard || '')
        alert(`Enviado: ${selectedCard}`)
    }

    const handleClick = () => {
        document.querySelector('form')?.requestSubmit()
    }

    return (
        <>
            <Drawer>
                <DrawerTrigger>Open</DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Qual atrocidade você dirá hoje?</DrawerTitle>
                        <DrawerDescription className="text-neutral-600">Lembrando que quanto pior, melhor.</DrawerDescription>
                    </DrawerHeader>
                    <form action={handleSubmit} className="px-4 flex flex-col gap-4 pb-4">
                        <div className="grid grid-cols-2 gap-4">
                            {playerDeck.map((item, key) => (
                                <DrawerClose className="w-full flex" key={key}>
                                    <label onClick={handleClick} className="w-full text-black text-start border border-neutral-300 has-[:checked]:border-purple-900 p-4 hover:border-neutral-900 hover:bg-neutral-200/50">
                                        <input
                                            className="hidden"
                                            type="radio"
                                            name="card"
                                            value={item}
                                        />
                                        {item}
                                    </label>
                                </DrawerClose>
                            ))}
                        </div>
                    </form>
                </DrawerContent>
            </Drawer>
            <span>{selectedCard}</span>
            <button disabled={!selectedCard} onClick={handleSendCard}>Send Card</button>
        </>
    );
}
export default DeckForm;