import { getQuestion } from '@/app/actions'
import Slide from '@/components/Slide'
import DeckForm from '@/components/deckForm'
import Card from '@/components/Card'

export default async function Home() {
  const question = await getQuestion()

  return (
    <div className="bg-neutral-200 w-full h-[100dvh] flex flex-col items-center py-4 gap-4">
      {question && <Card className="text-neutral-100 font-bold bg-neutral-900">{question}</Card>}
      <Slide/>
    </div>
  );
}
