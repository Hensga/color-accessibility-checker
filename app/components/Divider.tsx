export default function Divider() {
  return (
    <div className="relative py-20">
      <div aria-hidden="true" className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-with-color border-4" />
      </div>
    </div>
  );
}
