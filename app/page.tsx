import HomeUIS from "@/components/home/HomeUIS";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Welcome to Mark8",
  description: "Your store & products on Mark8",
}

export default function Home() {
  return (
    <>
    <HomeUIS/>
    </>
  );
}
