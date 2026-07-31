import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

export const PrimaryButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
    return (
        <button
            {...rest}
            style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                background: "var(--primary)",
                color: "#fff",
                cursor: "pointer",
                width: "100%",
            }}
        >
            {children}
        </button>
    )
}