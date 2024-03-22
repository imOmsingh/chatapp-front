import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Messenger from "@/components/Messenger";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
      <Messenger/>
  );
}
