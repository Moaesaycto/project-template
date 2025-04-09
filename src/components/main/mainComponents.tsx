import React, { useState } from 'react';
import SyntaxHighlighter from '../../template.config';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import './main.css';
import { CopyIcon, CheckIcon } from '@radix-ui/react-icons';
import MoaeButton from './MoaeButton';


type HeaderProps = {
    children: React.ReactNode;
};

/**
 * Header component that displays a heading and a paragraph with a link.
 *
 * @param {HeaderProps} props - The properties for the Header component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the header heading.
 *
 * @returns {JSX.Element} The rendered Header component.
 */
export const Header = ({ children }: HeaderProps) => {
    return (
        <header className="relative">
            <div className="flex justify-between items-start">
                <div className="header">
                    <h1 className="header-heading">{children}</h1>
                    <p className="header-font">
                        Check out more of my projects{" "}
                        <a
                            href="https://moaesaycto.github.io"
                            className="header-link"
                        >
                            here
                        </a>
                        !
                    </p>
                </div>
                <MoaeButton />
            </div>
            <ConstructionDivider />
        </header>
    );
};



/**
 * Footer component that displays a footer section with a construction divider,
 * a link to the author's website, and the current year.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <ConstructionDivider />
            <div className="footer">
                <p className="footer-text">
                    Like what I do? Consider checking me out{' '}
                    <a
                        href="https://moaesaycto.github.io"
                        className="footer-link"
                    >
                        here
                    </a>
                    .
                </p>
                <p>&copy; {currentYear} MOAE. All rights reserved.</p>
            </div>
        </footer>
    );
};


interface ConstructionPatternProps {
    height?: number;
}

/**
 * A functional component that renders a construction pattern divider.
 *
 * @component
 * @param {ConstructionPatternProps} props - The properties for the component.
 * @param {number} [props.height=10] - The height of the divider in pixels. Defaults to 10.
 * @returns {JSX.Element} A div element with a construction pattern class and specified height.
 */
export const ConstructionDivider: React.FC<ConstructionPatternProps> = ({ height = 10 }) => {
    return <div className={`construction-pattern w-full h-[${height}px]`} />;
};


type CodeProps = {
    children: React.ReactNode;
    secondary?: boolean;
};

/**
 * A functional component that renders its children within a <code> element.
 * The component applies a CSS class based on the `secondary` prop.
 *
 * @param {CodeProps} props - The properties for the Code component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the <code> element.
 * @param {boolean} [props.secondary=false] - If true, applies the "code-secondary" CSS class; otherwise, applies the "code" CSS class.
 * 
 * @returns {JSX.Element} The rendered <code> element with the appropriate CSS class.
 */
export const Code = ({ children, secondary = false }: CodeProps) => {
    return (
        <code className={secondary ? "code-secondary" : "code"}>
            {children}
        </code>
    );
};

type CodeBlockProps = {
    language?: string;
    children: string;
    showLineNumbers?: boolean;
};

/**
 * A component that renders a syntax-highlighted code block with optional copy-to-clipboard functionality.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.language="plaintext"] - The programming language of the code block for syntax highlighting.
 * @param {React.ReactNode} props.children - The code content to be displayed within the code block.
 * @param {boolean} [props.showLineNumbers=false] - Flag to determine whether to show line numbers in the code block.
 *
 * @returns {JSX.Element} The rendered code block component.
 */
export const CodeBlock = ({
    language = 'javascript',
    children,
    showLineNumbers = false,
}: CodeBlockProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(children)
            .then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            })
            .catch(() => alert('Failed to copy!'));
    };

    return (
        <div
            className="code-block-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && (
                <button
                    className="copy-button"
                    onClick={handleCopy}
                    aria-label="Copy code"
                >
                    {copySuccess ? <CheckIcon /> : <CopyIcon />}
                </button>
            )}
            <SyntaxHighlighter
                language={language}
                style={atomDark}
                showLineNumbers={showLineNumbers}
            >
                {children}
            </SyntaxHighlighter>
        </div>
    );
};



type BasicListProps = {
    children: React.ReactNode;
    ordered?: boolean;
};

/**
 * A React component that renders a basic list, either ordered or unordered, 
 * based on the `ordered` prop. The list items are styled with spacing and 
 * text formatting.
 *
 * @param {BasicListProps} props - The props for the BasicList component.
 * @param {React.ReactNode} props.children - The list items to be rendered as children.
 * @param {boolean} [props.ordered=false] - Determines whether the list is ordered (`<ol>`) 
 * or unordered (`<ul>`). Defaults to `false` (unordered).
 *
 * @returns {JSX.Element} A styled list element (`<ol>` or `<ul>`).
 */
export const BasicList = ({ children, ordered = false }: BasicListProps) => {
    const Tag = ordered ? "ol" : "ul";

    return (
        <Tag
            className={`pl-6 space-y-2 text-sm text-zinc-200 ${ordered ? "list-decimal" : "list-disc"
                }`}
        >
            {children}
        </Tag>
    );
};

export default CodeBlock;