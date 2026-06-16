# CyberTIP Frontend Architecture (React + TypeScript)

## Technology Stack

* React 19+
* TypeScript
* Vite
* Redux Toolkit
* Redux Saga
* React Router
* Axios
* Material UI

---

# Folder Structure

```text
src/
│
├── features/
│   ├── auth/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── slices/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── validation/
│   │
│   ├── users/
│   ├── dashboard/
│   ├── indicators/
│   ├── incidents/
│   ├── reports/
│   └── settings/
│
├── shared/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   ├── constants/
│   └── types/
│
├── store/
├── routes/
├── layouts/
├── assets/
├── config/
│
├── App.tsx
└── main.tsx
```

---

# Feature Structure Example

```text
features/
└── auth/
    │
    ├── pages/
    │   └── LoginPage.tsx
    │
    ├── components/
    │   └── LoginForm.tsx
    │
    ├── services/
    │   └── authApi.ts
    │
    ├── slices/
    │   └── authSlice.ts
    │
    ├── hooks/
    │   └── useAuth.ts
    │
    ├── types/
    │   ├── LoginRequest.ts
    │   ├── LoginResponse.ts
    │   └── AuthState.ts
    │
    └── validation/
        └── loginSchema.ts
```

---

# Types Folder

Every feature should own its business models.

Example:

```text
features/auth/types/
```

```ts
export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}
```

---

# Shared Types

Global reusable types.

```text
shared/types/
```

Example:

```ts
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
```

```ts
export interface PaginationRequest {
    page: number;
    pageSize: number;
}
```

---

# Services

All API calls belong here.

```text
services/
```

Example:

```ts
import httpClient from "@/shared/services/httpClient";

export const login = (request: LoginRequest) => {
    return httpClient.post<LoginResponse>(
        "/auth/login",
        request
    );
};
```

---

# Redux Store

```text
store/
│
├── index.ts
├── rootReducer.ts
├── rootSaga.ts
└── hooks.ts
```

---

## hooks.ts

Strongly typed Redux hooks.

```ts
import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector
} from "react-redux";

import type {
    RootState,
    AppDispatch
} from "./index";

export const useAppDispatch =
    () => useDispatch<AppDispatch>();

export const useAppSelector:
    TypedUseSelectorHook<RootState> =
    useSelector;
```

---

# Shared Components

Reusable UI components.

```text
shared/components/
│
├── Button/
│   ├── Button.tsx
│   ├── Button.types.ts
│   └── index.ts
│
├── Modal/
└── DataTable/
```

Example:

```ts
export interface ButtonProps {
    label: string;
    loading?: boolean;
    onClick: () => void;
}
```

---

# Config

```text
config/
├── environment.ts
├── permissions.ts
└── routes.ts
```

Example:

```ts
export const API_URL =
    import.meta.env.VITE_API_URL;
```

---

# Import Alias

Configure Vite and TypeScript:

```text
@
└── src/
```

Example:

```ts
import LoginForm
from "@/features/auth/components/LoginForm";

import httpClient
from "@/shared/services/httpClient";
```

Avoid:

```ts
../../../components
```

---

# Naming Convention

Components:

```text
PascalCase
```

Example:

```text
UserTable.tsx
LoginForm.tsx
```

Hooks:

```text
useSomething.ts
```

Example:

```text
useAuth.ts
usePagination.ts
```

Interfaces:

```ts
interface UserDto {}
interface LoginRequest {}
```

Types:

```ts
type ThemeMode = "light" | "dark";
```

Redux Slices:

```text
authSlice.ts
userSlice.ts
incidentSlice.ts
```

---

# Architecture Rules

1. Feature code stays inside its feature folder.
2. Shared code stays in shared/.
3. Components should not call APIs directly.
4. APIs belong in services/.
5. Business state belongs in Redux Toolkit slices.
6. Use TypeScript interfaces for all DTOs.
7. Use path aliases (@) instead of relative imports.
8. Each feature owns its own types, services, and validation.
9. Shared folder must not contain feature-specific logic.
10. New modules should be added under features/ without modifying existing features.

This architecture is optimized for enterprise-scale React + TypeScript applications and fits CyberTIP's future growth into a full Threat Intelligence Platform.
