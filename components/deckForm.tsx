"use client"

import { setPlayerCard } from "@/app/actions"

import { useState } from "react"

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

    return (
        <>
            <form action={handleSubmit}>
                {playerDeck.map((item, key) => (
                    <label className="text-black" key={key}>
                        <input
                            type="radio"
                            name="card"
                            value={item}
                        />
                        {item}
                    </label>
                ))}
                <button type="submit" className="text-black bg-white">Choose</button>
            </form>
            <span>{selectedCard}</span>
            <button disabled={!selectedCard} onClick={handleSendCard}>Send Card</button>
        </>
    );
}
export default DeckForm;