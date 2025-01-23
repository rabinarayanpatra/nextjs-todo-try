import { UserButton } from "@clerk/nextjs";
import { Logo } from "@/components/logo";

export const Navbar = () => {
  return (
    <nav className={"p-4 flex justify-around shadow-md"}>
      <div className={"flex items-center space-x-20"}>
        <Logo />
      </div>
      <UserButton />
    </nav>
  );
};
