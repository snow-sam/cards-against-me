import { getQuestion, getPlayerDeck } from '@/app/actions'
import DeckForm from '@/components/deckForm'
import { cn } from '@/lib/utils'


const Card = ({ children, className }: { children: React.ReactNode, className: string }) => {
  return (
    <span className={cn("w-[200px] h-[320px] rounded-2xl p-4", className)}>{children}</span>
  )
}

export default async function Home() {
  const question = await getQuestion()
  const playerDeck = await getPlayerDeck()

  console.log(question, playerDeck)
  return (
    <div className="bg-neutral-200 w-full h-[100dvh] flex flex-col items-center py-4 gap-4">
      {question && <Card className="text-neutral-100 font-bold bg-neutral-900">{question}</Card>}
      <DeckForm playerDeck={playerDeck} />
    </div>
  );
}
