import Link from 'next/link';
import type { CompatibleProduct } from '@/content/compatible-products';

const DISPLAY =
  "[font-family:var(--font-space),'Space Grotesk',var(--font-sora),sans-serif]";

const DELAY = ['delay-[40ms]', 'delay-[120ms]', 'delay-[200ms]'] as const;

export default function CompatibleProductsGrid({
  products,
}: {
  products: readonly CompatibleProduct[];
}) {
  return (
    <ul className="m-0 [display:grid] list-none grid-cols-3 gap-3.5 p-0 max-[900px]:grid-cols-1">
      {products.map((product, i) => (
        <li
          key={product.id}
          className={`reveal m-0 min-h-0 overflow-hidden rounded-2xl border-4 border-white bg-[#f1f7fe] p-0 shadow-none transition-[transform,border-color] duration-[280ms] ease-[cubic-bezier(.16,1,.3,1)] ${DELAY[i] ?? ''} hover:-translate-y-1 hover:border-white motion-reduce:hover:translate-y-0`}
        >
          <Link
            href={product.href}
            className="group [display:grid] h-full min-h-[112px] grid-cols-[minmax(96px,44%)_minmax(0,1fr)] items-center gap-x-2.5 gap-y-1.5 py-2 pr-3.5 pl-1.5 no-underline text-inherit max-[640px]:min-h-[100px] max-[640px]:py-2 max-[640px]:pr-3 max-[640px]:pl-1.5"
          >
            <span className="flex h-full min-h-24 w-full items-center justify-center overflow-visible bg-transparent px-1.5 py-0 max-[640px]:min-h-[88px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${product.img}?v=compat1`}
                alt=""
                loading="lazy"
                className="block h-full max-h-[100px] w-full bg-transparent object-contain object-center mix-blend-normal transition-transform duration-[400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06] group-hover:-translate-y-0.5 motion-reduce:group-hover:scale-100 motion-reduce:group-hover:translate-y-0 max-[640px]:max-h-[90px]"
              />
            </span>
            <span className="flex min-w-0 flex-col items-start justify-center gap-0.5 pr-0.5">
              <p
                className={`${DISPLAY} m-0 text-[.98rem] font-bold leading-tight tracking-[-0.015em] text-[#0d1b4d] transition-colors duration-[220ms] ease-[ease] group-hover:text-[#0050D8]`}
              >
                {product.name}
              </p>
              {product.category ? (
                <p className="m-0 text-[.8rem] font-medium leading-[1.25] text-[#6b7385]">
                  {product.category}
                </p>
              ) : null}
              <span className="mt-1 inline-block text-[.82rem] font-semibold text-[#0050D8] transition-[color,transform] duration-[220ms] ease-[ease] group-hover:translate-x-[3px] group-hover:text-[#0041AF] motion-reduce:group-hover:translate-x-0">
                Learn more &gt;
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
