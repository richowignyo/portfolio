
/**
 * Shared content contract for Project Sections.
 *
 * This file is used by:
 * - Admin Project Section Builder
 * - Content Block Editor
 * - Server Actions
 * - Public Project Section Renderer
 *
 * Keep this file independent from React and Supabase.
 */

export type ProjectBlockType =
  | "text"
  | "image"
  | "table"
  | "metrics"
  | "list"
  | "callout"
  | "link";

export type ProjectImageLayout =
  | "full"
  | "half"
  | "image-text";

export type ProjectListStyle =
  | "bullet"
  | "numbered";

export type ProjectCalloutVariant =
  | "info"
  | "success"
  | "warning"
  | "default";

export type ProjectTextBlockData = {
  heading?: string;
  body: string;
};

export type ProjectImageBlockData = {
  path: string;
  alt: string;
  caption?: string;
  description?: string;
  layout: ProjectImageLayout;
};

export type ProjectTableBlockData = {
  title?: string;
  description?: string;
  columns: string[];
  rows: string[][];
};

export type ProjectMetricItem = {
  id: string;
  value: string;
  label: string;
  description?: string;
};

export type ProjectMetricsBlockData = {
  heading?: string;
  items: ProjectMetricItem[];
};

export type ProjectListBlockData = {
  heading?: string;
  style: ProjectListStyle;
  items: string[];
};

export type ProjectCalloutBlockData = {
  variant: ProjectCalloutVariant;
  title?: string;
  message: string;
};

export type ProjectLinkBlockData = {
  label: string;
  url: string;
  description?: string;
};

export type ProjectContentBlock<T = unknown> = {
  id: string;
  type: ProjectBlockType;
  is_visible: boolean;
  data: T;
};

export type TextBlock = ProjectContentBlock<ProjectTextBlockData> & {
  type: "text";
};

export type ImageBlock = ProjectContentBlock<ProjectImageBlockData> & {
  type: "image";
};

export type TableBlock = ProjectContentBlock<ProjectTableBlockData> & {
  type: "table";
};

export type MetricsBlock = ProjectContentBlock<ProjectMetricsBlockData> & {
  type: "metrics";
};

export type ListBlock = ProjectContentBlock<ProjectListBlockData> & {
  type: "list";
};

export type CalloutBlock = ProjectContentBlock<ProjectCalloutBlockData> & {
  type: "callout";
};

export type LinkBlock = ProjectContentBlock<ProjectLinkBlockData> & {
  type: "link";
};

export type ProjectContentBlockUnion =
  | TextBlock
  | ImageBlock
  | TableBlock
  | MetricsBlock
  | ListBlock
  | CalloutBlock
  | LinkBlock;

/**
 * A section stores an ordered array of content blocks.
 * This remains compatible with the existing JSONB array constraint.
 */
export type ProjectSectionContent = ProjectContentBlockUnion[];

/**
 * Create a stable fallback ID for legacy content.
 * Existing legacy strings are not modified in the database by this function.
 */
function createLegacyId(index: number): string {
  return `legacy-text-${index + 1}`;
}

/**
 * Check whether a value is a supported block type.
 */
export function isProjectBlockType(
  value: unknown
): value is ProjectBlockType {
  return (
    value === "text" ||
    value === "image" ||
    value === "table" ||
    value === "metrics" ||
    value === "list" ||
    value === "callout" ||
    value === "link"
  );
}

/**
 * Basic structural validation for content blocks.
 *
 * Detailed field validation will also be performed
 * by the editor and Server Actions.
 */
export function isProjectContentBlock(
  value: unknown
): value is ProjectContentBlockUnion {
  if (!value || typeof value !== "object") {
    return false;
  }

  const block = value as Record<string, unknown>;

  if (
    typeof block.id !== "string" ||
    !block.id.trim() ||
    !isProjectBlockType(block.type) ||
    typeof block.is_visible !== "boolean" ||
    !block.data ||
    typeof block.data !== "object" ||
    Array.isArray(block.data)
  ) {
    return false;
  }

  return true;
}

/**
 * Normalize content from Supabase.
 *
 * Supports:
 * 1. New structured block arrays.
 * 2. Legacy arrays containing plain strings.
 *
 * This allows existing project sections to remain readable
 * while we gradually migrate old content.
 */
export function normalizeProjectContent(
  content: unknown
): ProjectSectionContent {
  if (!Array.isArray(content)) {
    return [];
  }

  return content.flatMap((item, index) => {
    // Legacy format: ["Paragraph one", "Paragraph two"]
    if (typeof item === "string") {
      const body = item.trim();

      if (!body) {
        return [];
      }

      return [
        {
          id: createLegacyId(index),
          type: "text" as const,
          is_visible: true,
          data: {
            body,
          },
        },
      ];
    }

    // New structured format.
    if (isProjectContentBlock(item)) {
      return [item];
    }

    // Ignore malformed entries instead of crashing the renderer.
    return [];
  });
}

/**
 * Create a new empty block.
 * Call this from the client when the user adds a block.
 */
export function createProjectContentBlock(
  type: ProjectBlockType
): ProjectContentBlockUnion {
  const id = crypto.randomUUID();

  switch (type) {
    case "text":
      return {
        id,
        type: "text",
        is_visible: true,
        data: {
          heading: "",
          body: "",
        },
      };

    case "image":
      return {
        id,
        type: "image",
        is_visible: true,
        data: {
          path: "",
          alt: "",
          caption: "",
          description: "",
          layout: "full",
        },
      };

    case "table":
      return {
        id,
        type: "table",
        is_visible: true,
        data: {
          title: "",
          description: "",
          columns: ["Column 1", "Column 2"],
          rows: [["", ""]],
        },
      };

    case "metrics":
      return {
        id,
        type: "metrics",
        is_visible: true,
        data: {
          heading: "",
          items: [
            {
              id: crypto.randomUUID(),
              value: "",
              label: "",
              description: "",
            },
          ],
        },
      };

    case "list":
      return {
        id,
        type: "list",
        is_visible: true,
        data: {
          heading: "",
          style: "bullet",
          items: [""],
        },
      };

    case "callout":
      return {
        id,
        type: "callout",
        is_visible: true,
        data: {
          variant: "info",
          title: "",
          message: "",
        },
      };

    case "link":
      return {
        id,
        type: "link",
        is_visible: true,
        data: {
          label: "",
          url: "",
          description: "",
        },
      };
  }
}
