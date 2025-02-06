import FashionShop from '../components/FashionShop';
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main>
      <Toaster />
      <FashionShop />
    </main>
  )
}