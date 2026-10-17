export default function BrandLogo({
  size = 40,
  className = "",
  decorative = false,
}) {
  return (
    <img
      src="/favicon.svg"
      alt={decorative ? "" : "Mandate"}
      width={size}
      height={size}
      className={`shrink-0 rounded-md object-contain ${className}`}
    />
  );
}
