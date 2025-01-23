import { UserButton } from "@clerk/nextjs";
import { Logo } from "@/components/logo";

export const Navbar = () => {
  return (
    <nav className={"p-4 flex justify-around shadow-md"}>
      <div>
        <Logo />
      </div>
      <UserButton />
    </nav>
  );
};
