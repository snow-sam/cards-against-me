"use client"

import { usePlayerSocket } from "@/hooks/usePlayerSocket"
import { ArrowUp } from "lucide-react"

import { useState, useEffect } from "react"

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
import Slide from "@/components/Slide"
import toast from "react-hot-toast"

const DeckForm = () => {
    const socket = usePlayerSocket();
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [data, setData] = useState({});
    const [isSended, setIsSended] = useState(false)
    const [cards, setCards] = useState<string[]>([])

    useEffect(() => {
        socket?.on("vote", (cards: string[]) => setCards(cards))
        socket?.on("reset", reset)
        socket?.emit("_getData", setData)
        console.log(data, "TESTE")
    }, [socket])

    const handleSendCard = () => {
        socket?.emit("sendCard", selectedCard)
        setIsSended(true)
        setSelectedCard(null)
        socket?.emit("_getData", setData)
    }

    const reset = (winner: string[]) => {
        toast.success(winner.join(" "))
        setIsSended(false)
        setCards([])
    }

    const sendVote = (playerId: string) => {
        socket?.emit("vote_", playerId)
    }

    if (isSended) {
        return (
            <>
                <Card className="text-neutral-100 font-bold bg-neutral-900">{data.question}</Card>
                <Slide voteFnc={sendVote} cards={cards} />
            </>
        )
    }

    return (
        <>
            {data.id}
            <Card className="text-neutral-100 font-bold bg-neutral-900">{data.question}</Card>
            <button disabled={!selectedCard} onClick={handleSendCard}><ArrowUp className="bg-white p-2 rounded-full border shadow border-neutral-300 fixed left-1/2 transform -translate-x-1/2" size={40} /></button>
            <Drawer>
                <DrawerTrigger className="fixed bottom-0">
                    <Image className="w-full" alt="Cards drawer" src={CardsImage} priority={true} />
                    {selectedCard && <Card className="text-black text-start flex font-bold bg-white border border-neutral-400 shadow absolute inset-x-16 -bottom-28 z-100">{selectedCard}</Card>}
                </DrawerTrigger>
                <DrawerContent className="absolute bottom-4">
                    <DrawerHeader>
                        <DrawerTitle>Qual atrocidade você dirá hoje?</DrawerTitle>
                        <DrawerDescription className="text-neutral-600">Lembrando que quanto pior, melhor.</DrawerDescription>
                    </DrawerHeader>
                    <div className="grid grid-cols-2 gap-4 px-4">
                        {data.cards?.map((item, key) => (
                            <DrawerClose key={key} onClick={() => setSelectedCard(item)} className="w-full flex text-black text-start border border-neutral-300 p-4 hover:border-neutral-900 hover:bg-neutral-200/50">
                                {item}
                            </DrawerClose>
                        ))}
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}
export default DeckForm;