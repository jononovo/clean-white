# SecureClawHub Project Structure

## Core Layout
The application uses a persistent layout wrapper that handles global navigation, theming, and structure.

- **`Layout`** (`client/src/components/layout.tsx`)
  - The master wrapper for all pages.
  - **Features**:
    - Responsive Sidebar (Desktop fixed / Mobile drawer)
    - Sticky Header with Search and Theme Controls
    - Theme State Management (Slate/Warm + Light/Dark)
    - Integrated Authentication Drawer
  - **Internal Components**:
    - `SidebarContent`: The navigation menu and filters list.

## Global Components
Reusable components designed for application-wide use.

- **`AuthDrawer`** (`client/src/components/auth-drawer.tsx`)
  - **Purpose**: Unified login and registration flow.
  - **Type**: Right-side Sheet/Drawer.
  - **Features**: Login/Register tabs, Social Auth buttons, Password visibility toggle.
  - **Trigger**: Accessed via the "Google" login button in the header.

- **`FullPageModal`** (`client/src/components/modals.tsx`)
  - **Purpose**: Displaying detailed content (reports, deep-dives) without leaving the context.
  - **Type**: Full-screen, semi-transparent backdrop overlay.
  - **Usage**: `<FullPageModal open={...} title="...">...</FullPageModal>`

- **`ConfirmationModal`** (`client/src/components/modals.tsx`)
  - **Purpose**: Critical action verification (Delete, Report, Block).
  - **Type**: Small, focused alert dialog.
  - **Variants**: Default (Blue) and Destructive (Red).
  - **Usage**: `<ConfirmationModal variant="destructive" onConfirm={...} ... />`

## Pages
- **`Home`** (`client/src/pages/home.tsx`)
  - The main dashboard view.
  - **Sections**:
    - Hero Banner (Theme-aware)
    - Live Feed & Top Scorers (Scrollable Lists)
    - Featured Cards (Grid)
    - Verified Directory (Detailed List)
    - Security Badges & Newsletter
    - Active Threats & Infrastructure Status

## UI Library (`client/src/components/ui`)
Built on top of Radix UI and Tailwind CSS.
- **Primitives**: `Button`, `Input`, `Label`, `Card`, `Badge`, `Separator`
- **Overlays**: `Sheet` (Drawer), `Dialog` (Modal), `AlertDialog`, `Popover`, `Tooltip`, `Toaster`
- **Navigation**: `DropdownMenu`, `Tabs`
- **Feedback**: `Skeleton`, `Progress`
