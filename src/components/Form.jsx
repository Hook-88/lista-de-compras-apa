export default function Form({children, onSubmit = () => {}, ...rest}) {
    function handleSubmit(event) {
        event.preventDefault()
        onSubmit()
    }

    return (
        <form
            onSubmit={handleSubmit}
            {...rest}
        >
            {children}
        </form>
    )
}