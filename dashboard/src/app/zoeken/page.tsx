import Link from "next/link";
import { cookies } from "next/headers";
import Navbar from "@/components/navbar";
import Section from "@/components/section";
import Tile from "@/components/tile";
import { FaChevronRight } from "react-icons/fa6";
import LoggedFrame from "@/components/loggedIn";
import { API_URL } from "@/APIURL";
import GenreStats from "@/components/stats/genreStats";
import PrijsSpeeltijdStats from "@/components/stats/prijsSpeeltijd";
import ZoekBalk from "@/components/zoeken/zoekbalk";

export default async function ZoekPagina() {
  return (
    <div>
      <LoggedFrame>
        <Navbar />
        <Section>
          <h1 className="text-lichtgrijs  font-bold text-2xl italic mb-2">
            Games zoeken
          </h1>
          <ZoekBalk />
        </Section>
      </LoggedFrame>
    </div>
  );
}
