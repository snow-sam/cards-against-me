import { getQuestion, getPlayerDeck } from '@/app/actions'
import DeckForm from '@/components/deckForm'

export default async function Home() {
  const question = await getQuestion()
  const playerDeck = await getPlayerDeck()

  console.log(question, playerDeck)
  return (
    <div className="bg-neutral-200 w-full h-[100dvh]">
      {question && <span className="text-black">{question}</span>}
      <DeckForm playerDeck={playerDeck}/>
    </div>
  );
}
