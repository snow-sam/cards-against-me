"use client"

import Card from "@/components/Card"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { useState } from "react"

type SlideProps = {
    voteFnc: (card: string) => void 
    cards: string[]
}

const Slide = ({ cards, voteFnc }: SlideProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [canVote, setCanVote] = useState(true)
    
    const nextCard = () => {
        setCurrentIndex(currentIndex === cards.length - 1 ? 0 : currentIndex + 1)
    }

    const previousCard = () => {
        setCurrentIndex(currentIndex === 0 ? cards.length - 1 : currentIndex - 1)
    }

    const vote = (card: string) => {
        voteFnc(card)
        setCanVote(false)
    }

    return (
        <div className="grid grid-cols-3 place-items-center">
            <button className="p-1" onClick={previousCard}><ArrowLeft className="bg-white p-2 rounded-full border shadow border-neutral-300 " size={40} /></button>
            <Card className="text-black flex font-bold bg-white border border-neutral-400 shadow">{cards[currentIndex]?.card}</Card>
            <button className="p-1" onClick={nextCard}><ArrowRight className="bg-white p-2 rounded-full border shadow border-neutral-300" size={40} /></button>
            <button disabled={!canVote} className="fixed right-1/4 transform -translate-x-1/2 -translate-y-1/2 bottom-8  text-green-500" onClick={() => vote(cards[currentIndex])}><Check className="bg-white p-2 rounded-full border shadow border-neutral-400" size={40} /></button>
        </div>
    )
}

export default Slide