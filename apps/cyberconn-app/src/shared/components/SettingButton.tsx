export function SettingButton({ children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...rest}
            style={{
            }}
        >
            {children}
        </button>
    )
}