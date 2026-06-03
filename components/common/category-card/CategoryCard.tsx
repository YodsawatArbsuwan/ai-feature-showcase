import type { ProjectCategoryDto } from "@/generated/api/types.gen";
import Link from "next/link";

type Props = { category: ProjectCategoryDto };

export default function CategoryCard({ category }: Props) {
  return (
    <Link
      href={`/categories/${category.id}`}
      className="group block rounded-2xl p-0.5 bg-linear-to-br from-brand-navy via-brand to-brand-bright transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-bright/20"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[14px] bg-white">

        {/* ── Preview ── */}
        <div className="relative h-52 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Artificial_Intelligence_%26_AI_%26_Machine_Learning_-_30212411048.jpg/1280px-Artificial_Intelligence_%26_AI_%26_Machine_Learning_-_30212411048.jpg"
            alt={category.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-white to-transparent" />
        </div>

        {/* ── Body ── */}
        <div className="flex flex-1 flex-col gap-3 px-5 py-4">
          <h3 className="text-xl font-bold leading-tight text-brand-navy transition-colors group-hover:text-brand">
            {category.name}
          </h3>
          {category.description && (
            <p className="flex-1 text-sm leading-relaxed text-slate-500">
              {category.description}
            </p>
          )}
        </div>

      </div>
    </Link>
  );
}
