type HeadingProps = {
    children: React.ReactNode;
    level?: number;
}

export const Heading = ({ children, level = 1 }: HeadingProps) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    return (
        <>
            <Tag>
                {children}
            </Tag>
            {level == 2 && <hr />}
        </>
    )
}
