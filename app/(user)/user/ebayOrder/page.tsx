import ConnectButton from "@/components/user/ConnectButton";
import OrdersList from "@/components/user/OrdersList";


export default function Page() {
  return (
    <main className="min-h-screen p-4 md:p-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
          eBay Orders Dashboard
        </h1>
        <div className="flex justify-center md:justify-start">
          <ConnectButton />
        </div>
        <OrdersList />
      </div>
    </main>
  );
}