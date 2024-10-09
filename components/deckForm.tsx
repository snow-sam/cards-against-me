"use client"

import { setPlayerCard } from "@/app/actions"
import { ArrowUp } from "lucide-react"

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

import Image from "next/image"
import Card from "@/components/Card"

import CardsImage from '@/public/cards.svg'

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
            <button disabled={!selectedCard} onClick={handleSendCard}><ArrowUp className="bg-white p-2 rounded-full border shadow border-neutral-300 fixed left-1/2 transform -translate-x-1/2" size={40} /></button>
            <Drawer>
                <DrawerTrigger className="fixed bottom-0">
                    <Image className="w-full" alt="Cards drawer" src={CardsImage}/>
                    {selectedCard && <Card className="text-black flex font-bold bg-white border border-neutral-400 shadow absolute inset-x-16 -bottom-28 z-100">{selectedCard}</Card>}
                </DrawerTrigger>
                <DrawerContent className="absolute bottom-4">
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
        </>
    );
}
export default DeckForm;