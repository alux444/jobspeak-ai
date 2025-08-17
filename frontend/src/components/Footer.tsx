export default function Footer() {
  return (
    <footer className="py-4 text-center">
      <p className="text-sm">
        Developed by{" "}
        <a
          href="https://alux444.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Alex Liang
        </a>
        {" "}and{" "}
        <a
          href="https://tonylxm.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Tony Lim
        </a>
      </p>
    </footer>
  );
}