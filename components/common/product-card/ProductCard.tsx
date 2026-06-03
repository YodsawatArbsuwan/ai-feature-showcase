import type { ProductDto } from "@/generated/api/types.gen";
import { ExternalLink } from "lucide-react";

const DEFAULT_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Artificial_Intelligence_%26_AI_%26_Machine_Learning_-_30212411048.jpg/1280px-Artificial_Intelligence_%26_AI_%26_Machine_Learning_-_30212411048.jpg";

type Props = { product: ProductDto };

export default function ProductCard({ product }: Props) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">

      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={DEFAULT_IMAGE}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-white to-transparent" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 px-5 py-4">
        <h3 className="text-lg font-bold text-brand-navy">{product.name}</h3>

        {product.description && (
          <p className="flex-1 text-sm leading-relaxed text-slate-500">
            {product.description}
          </p>
        )}

        {product.url && (
          <div className="mt-2">
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-bright px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-bright/30"
            >
              <ExternalLink className="h-4 w-4" />
              Try Demo
            </a>
          </div>
        )}
      </div>

    </div>
  );
}
