---
description: Always read these instructions before implementing any UI-related features. This file outlines the strict guidelines for using shadcn/ui as the exclusive component library in this application.
---

# UI Components Guidelines

## 🎨 Component Library

**CRITICAL**: This project uses **shadcn/ui** exclusively. DO NOT create custom UI components.

## ✅ Required Practices

### 1. Use shadcn/ui Components Only

- **ALWAYS** use existing shadcn/ui components from the component library
- **NEVER** create custom buttons, inputs, cards, dialogs, or other UI primitives
- Check the [shadcn/ui documentation](https://ui.shadcn.com) for available components

### 2. Installing New shadcn Components

When you need a component that isn't yet installed:

```bash
npx shadcn@latest add [component-name]
```

**Examples:**
```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
```

### 3. Importing Components

All shadcn components are imported from `@/components/ui/`:

```typescript
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
```

### 4. Styling with Tailwind CSS v4

- Use Tailwind utility classes for styling
- Follow the project's Tailwind configuration
- Leverage shadcn's built-in variants (e.g., `variant="outline"`, `size="lg"`)

**Example:**
```typescript
<Button variant="default" size="lg" className="w-full">
  Submit
</Button>
```

## 🚫 What NOT to Do

- ❌ Don't create custom button components
- ❌ Don't write custom CSS for UI primitives
- ❌ Don't use unstyled HTML elements for interactive UI
- ❌ Don't reinvent components that shadcn already provides
- ❌ Don't use other component libraries (Material-UI, Ant Design, etc.)

## ✅ What TO Do

- ✅ Browse shadcn/ui docs first to find the right component
- ✅ Install missing shadcn components as needed
- ✅ Compose complex UIs from shadcn primitives
- ✅ Use shadcn's variants and Tailwind for customization
- ✅ Create domain-specific composite components that USE shadcn components

## 📋 Common shadcn Components

| Component | Use Case |
|-----------|----------|
| `Button` | All clickable actions |
| `Input` | Text input fields |
| `Card` | Content containers |
| `Dialog` | Modals and popups |
| `Form` | Form handling with validation |
| `Select` | Dropdown selections |
| `Checkbox` | Boolean inputs |
| `Table` | Data tables |
| `Toast` | Notifications |
| `Tabs` | Tabbed interfaces |
| `Avatar` | User profile images |
| `Badge` | Status indicators |
| `Alert` | Important messages |

## 🔨 Composite Components Pattern

When building domain-specific components, compose from shadcn primitives:

```typescript
// ✅ GOOD: Composite component using shadcn primitives
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function LinkCard({ title, url, clicks }: LinkCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{url}</p>
        <p>Clicks: {clicks}</p>
        <Button variant="outline">View Details</Button>
      </CardContent>
    </Card>
  )
}
```

```typescript
// ❌ BAD: Custom UI primitive
export function CustomButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded">
      {children}
    </button>
  )
}
```

## 🎯 Before Writing ANY UI Code

1. **Search shadcn/ui docs** for an existing component
2. **Check if it's installed** in `/components/ui/`
3. **Install if needed** using `npx shadcn@latest add [component]`
4. **Import and use** the shadcn component
5. **Customize** using variants and Tailwind classes

## 📦 Component Configuration

shadcn components are configured in `components.json`. This file defines:
- Style preferences
- Tailwind configuration
- Component installation paths
- TypeScript settings

**Do not modify this file** unless changing the project-wide component system.

---

**Remember**: When in doubt, check shadcn/ui documentation first. Every UI primitive you need likely already exists.
