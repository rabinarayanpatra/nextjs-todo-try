import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddTodo from "@/components/add-todo";

export default function Home() {
  return (
    <main className={"p-4 flex items-center"}>
      <div className={"flex w-1/3 justify-end"}>
        <AddTodo
          trigger={
            <Button>
              Add <PlusCircle />
            </Button>
          }
        />
      </div>
      <div></div>
    </main>
  );
}
