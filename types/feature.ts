export type FeatureCategory =
  | "NLP"
  | "Vision"
  | "Audio"
  | "Data"
  | "Coding"
  | "Multimodal";

export type FeatureBadge = "New" | "Beta" | "Stable";

export type FeatureMeta = {
  slug: string;
  name: string;
  category: FeatureCategory;
  description: string;
  docsUrl?: string;
  badge?: FeatureBadge;
  disabled?: boolean;
  gradient?: string;
  icon?: string;
  imageUrl?: string;
  features?: string[];
};
