import React from 'react'

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children? : React.ReactNode
}


export const InputText: React.FC<InputTextProps> = (props) => {
    return (
        <input
            {...props}
            style={{
                padding: "8px 12px",
                width: "100%",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
                boxSizing: "border-box",
                ...(props.style || {}),
            }}
        />
    )
} 