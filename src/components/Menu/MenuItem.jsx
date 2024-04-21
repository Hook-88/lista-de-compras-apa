export default function MenuItem({children, ...rest}) {
    
    return (
        <li {...rest}>{children}</li>
    )
}