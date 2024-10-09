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
        <div className="">
            <button onClick={previousCard}><ArrowLeft className="bg-white p-2 rounded-full border shadow border-neutral-300 fixed left-1/3 top-1/2 transform -translate-x-1/3 translate-y-full" size={40} /></button>
            <button onClick={nextCard}><ArrowRight className="bg-white p-2 rounded-full border shadow border-neutral-300 fixed right-1/3 top-1/2 transform -translate-x-1/3 translate-y-full" size={40} /></button>
            <Card className="text-black flex font-bold bg-white border border-neutral-400 shadow">{cartas[currentIndex]}</Card>
        </div>
    )
}

export default Slide