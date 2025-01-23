import type { Metadata } from "next";
import React from "react";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Smart Todo",
  description: "Manage your todos smartly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
