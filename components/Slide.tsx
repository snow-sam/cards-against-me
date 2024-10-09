"use client"

import Card from "@/components/Card"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useState } from "react"

const Slide = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const cartas = ["Carta 1", "Carta 2", "Carta 3"]

    const nextCard = () => {
        setCurrentIndex(currentIndex === cartas.length-1  ? 0 : currentIndex + 1)
    }

    const previousCard = () => {
        setCurrentIndex(currentIndex === 0 ? cartas.length-1 : currentIndex - 1)
    }

    return (
        <div className="grid grid-cols-3 place-items-center">
            <button onClick={previousCard}><ArrowLeft className="bg-white p-2 rounded-full border shadow border-neutral-300 " size={40} /></button>
            <Card className="text-black flex font-bold bg-white border border-neutral-400 shadow">{cartas[currentIndex]}</Card>
            <button onClick={nextCard}><ArrowRight className="bg-white p-2 rounded-full border shadow border-neutral-300" size={40} /></button>
        </div>
    )
}

export default Slide