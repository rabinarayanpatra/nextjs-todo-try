import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className={"p-4 flex items-center"}>
      <div className={"flex w-1/3 justify-end"}>
        <Button>
          Add <PlusCircle />
        </Button>
      </div>
      <div></div>
    </main>
  );
}
