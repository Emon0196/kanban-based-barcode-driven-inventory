export default function Button({ children, ...props }) {
  return (
    <button
      className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      {...props}
    >
      {children}
    </button>
  );
}
