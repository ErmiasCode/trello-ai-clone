import Board from '@/components/Board'
import Header from '@/components/Header'

export default function Home() {
  console.log("Test", process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  return (
    <main>
      <Header />  
      <Board />
    </main>
  )
}
