import DeckForm from '@/components/deckForm'

export default function Home() {
  return (
    <div className="bg-neutral-200 w-full h-[100dvh] flex flex-col items-center py-4 gap-4">
      <DeckForm />
    </div>
  );
}
