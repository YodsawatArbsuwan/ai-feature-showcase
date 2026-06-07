export type FeatureCategory =
  | "NLP"
  | "Vision"
  | "Audio"
  | "Data"
  | "Coding"
  | "Multimodal";

export type FeatureBadge = "New" | "Beta" | "Stable";

export type TechnicalSpecs = {
  avgLatency?: string;
  systemAccuracy?: string;
  activeModel?: string;
};

export type ReferenceImplementation = {
  title: string;
  description: string;
  imageUrl?: string;
  imageUuid?: string;
  activTokens?: string;
};

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
  imageUuid?: string;
  features?: string[];
  architecturalTags?: string[];
  technicalSpecs?: TechnicalSpecs;
  quickIntegration?: string;
  references?: ReferenceImplementation[];
};
