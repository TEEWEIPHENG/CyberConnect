import React, { useState } from 'react'
import { Eye, EyeOff } from "lucide-react";
interface InputPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode
}


export const InputPassword: React.FC<InputPasswordProps> = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div style={{
            position: "relative",
            width: "100%",
        }}>
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
                type={showPassword ? "text" : "password"}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                    position: "absolute",
                    right: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "none",
                    background: "transparent",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    padding: "4px",
                }}
            >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>

    )
} 