import React, { createContext, useContext, useEffect, useState } from "react";

export type TOCEntry = {
    id: string;
    text: string;
    level: number;
};

type TOCContextType = {
    entries: TOCEntry[];
    register: (entry: TOCEntry) => void;
};

const TOCContext = createContext<TOCContextType | undefined>(undefined);

export const useTOC = () => {
    const context = useContext(TOCContext);
    if (!context) throw new Error("useTOC must be used inside TOCProvider");
    return context;
};

export const TOCProvider = ({ children }: { children: React.ReactNode }) => {
    const [entries, setEntries] = useState<TOCEntry[]>([]);

    const register = (entry: TOCEntry) => {
        setEntries((prev) => {
            // Avoid duplicates
            if (prev.find((e) => e.id === entry.id)) return prev;
            return [...prev, entry];
        });
    };

    return (
        <TOCContext.Provider value={{ entries, register }}>
            {children}
        </TOCContext.Provider>
    );
};


type HeadingProps = {
    children: React.ReactNode;
    level?: number;
    id?: string;
};

/**
 * A React component that renders a heading element (`h1` through `h6`) with dynamic styles and functionality.
 * The component also integrates with a Table of Contents (TOC) context to register the heading for navigation purposes.
 *
 * @param {HeadingProps} props - The props for the Heading component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the heading.
 * @param {number} [props.level=1] - The heading level (1 through 6). Defaults to 1 if not provided.
 * @param {string} [props.id] - An optional ID for the heading. If not provided, an ID is generated by slugifying the text content.
 *
 * @returns {JSX.Element} A heading element with the specified level, styles, and optional horizontal rule for level 2 headings.
 *
 * @remarks
 * - The `slugify` function generates a URL-friendly ID by converting the text to lowercase, removing non-alphanumeric characters, and replacing spaces with hyphens.
 * - The `useEffect` hook ensures the heading is registered with the TOC context when the component is mounted or when relevant dependencies change.
 * - The `levelStyles` object defines specific styles for each heading level, with fallback styles for unsupported levels.
 *
 * @example
 * ```tsx
 * <Heading level={2} id="custom-id">
 *   Section Title
 * </Heading>
 * ```
 * This renders an `<h2>` element with the text "Section Title" and a custom ID of "custom-id".
 */
export const Heading = ({ children, level = 1, id }: HeadingProps) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;

    const slugify = (text: string) =>
        text.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim().replace(/\s+/g, "-");

    const textContent = typeof children === "string" ? children : "";
    const generatedId = id || slugify(textContent);

    const { register } = useTOC();

    useEffect(() => {
        if (textContent) {
            register({ id: generatedId, text: textContent, level });
        }
    }, [generatedId, textContent, level, register]);

    const baseStyles = "font-bold";
    const levelStyles: Record<number, string> = {
        1: "text-3xl mt-8 mb-4",
        2: "text-2xl mt-6 mb-3",
        3: "text-xl mt-5 mb-2",
        4: "text-lg mt-4 mb-2",
        5: "text-base mt-3 mb-1",
        6: "text-sm mt-2 mb-1",
    };
    const styles = `${baseStyles} ${levelStyles[level] || levelStyles[6]}`;

    return (
        <>
            <Tag id={generatedId} className={styles}>
                {children}
            </Tag>
            {level === 2 && <hr className="border-t border-gray-300 mb-4" />}
        </>
    );
};



export const TableOfContents = () => {
    const { entries } = useTOC();

    return (
        <nav className="my-6 w-full bg-zinc-900 rounded p-4">
            <h2 className="font-bold mb-2 text-xl">Table of Contents</h2>
            <hr className="mb-4" />
            <ul className="space-y-2 text-sm">
                {entries.map(({ id, text, level }) => (
                    <li key={id} className="flex items-center m-0">
                        {Array.from({ length: level - 1 }).map((_, i) => (
                            <span
                                key={i}
                                className="w-4 inline-block border-l-2 border-gray-600 h-6 mr-2"
                            ></span>
                        ))}
                        <a href={`#${id}`} className="hover:underline">
                            {text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};