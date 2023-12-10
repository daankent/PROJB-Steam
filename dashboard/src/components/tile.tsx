// Tegel component
export default function Tile({ children }: any) {
  return (
    <div className="shadow-lg bg-lichtgrijs bg-opacity-30 p-4 rounded-md">
      {children}
    </div>
  );
}
