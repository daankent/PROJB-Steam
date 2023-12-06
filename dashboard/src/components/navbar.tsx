import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex flex-row bg-donkerblauw border-b-2 border-b-white">
      <div className="flex items-center justify-center p-4">
        <Link href="/">
          <h1 className="text-lichtgrijs font-bold">
            STEAM<span className="text-blauw">HUB</span>
          </h1>
        </Link>
      </div>
    </div>
  );
}
