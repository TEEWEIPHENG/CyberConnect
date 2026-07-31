import { useTheme } from "@/shared/context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme}
            style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
                cursor: "pointer",
            }}
        >
            {theme === 'light' ? "Dark Mode" : "Light Mode"}
        </button>
    )
}