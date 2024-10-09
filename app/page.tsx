import { getQuestion, getPlayerDeck } from '@/app/actions'
import Slide from '@/components/Slide'
import Card from '@/components/Card'

export default async function Home() {
  const question = await getQuestion()
  const playerDeck = await getPlayerDeck()

  console.log(question, playerDeck)
  return (
    <div className="bg-neutral-200 w-full h-[100dvh] flex flex-col items-center py-4 gap-4">
      {question && <Card className="text-neutral-100 font-bold bg-neutral-900">{question}</Card>}
      <Slide/>
    </div>
  );
}
