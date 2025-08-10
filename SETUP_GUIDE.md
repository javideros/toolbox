# Vaadin + React + Tailwind CSS Setup Guide

This guide documents the step-by-step process to set up a Vaadin application with React frontend and Tailwind CSS styling.

## Prerequisites

- Java 21
- Maven
- Node.js and npm

## Initial Project Setup

1. **Create Vaadin Project**
   - Generated using Vaadin starter with React frontend
   - Includes Spring Boot, JPA, PostgreSQL, and security features

2. **Project Structure**
   ```
   toolbox/
   ├── src/main/
   │   ├── java/           # Backend Java code
   │   ├── frontend/       # React frontend code
   │   └── resources/      # Application resources
   ├── pom.xml            # Maven configuration
   └── package.json       # Node.js dependencies
   ```

## Tailwind CSS Integration

### Step 1: Install Tailwind CSS v3

```bash
npm install -D tailwindcss@^3.4.0 postcss autoprefixer
```

### Step 2: Create Configuration Files

**tailwind.config.js** (ES Module syntax):
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/main/frontend/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**postcss.config.js** (ES Module syntax):
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Step 3: Create Tailwind CSS File

**src/main/frontend/styles/globals.css**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 4: Import Tailwind CSS

Add to **src/main/frontend/index.tsx**:
```typescript
import './styles/globals.css';
```

## Project Views

The application includes the following views:

1. **Dashboard** (`/`) - Main landing page
2. **Task List** (`/task-list`) - Task management interface
3. **Users** (`/users`) - User management placeholder
4. **Analytics** (`/analytics`) - Analytics placeholder
5. **Reports** (`/reports`) - Reports placeholder
6. **Settings** (`/settings`) - Settings placeholder

## Key Configuration Notes

### ES Module Compatibility
- The project uses `"type": "module"` in package.json
- All configuration files must use ES module syntax (`export default` instead of `module.exports`)

### Vaadin Integration
- Tailwind CSS is imported in the main React entry point
- Vaadin components work alongside Tailwind utilities
- The layout uses Vaadin's AppLayout with custom styling

### Maven Configuration
- Standard Vaadin Maven plugin configuration
- No custom Node.js/npm path configuration needed if tools are in PATH

## Running the Application

```bash
./mvnw spring-boot:run
```

The application will be available at `http://localhost:8080`

## Troubleshooting

### Common Issues

1. **Module syntax errors**: Ensure all config files use ES module syntax
2. **Frontend compilation fails**: Check that all imports are valid and dependencies are installed
3. **Tailwind not working**: Verify the CSS import in index.tsx and PostCSS configuration

### Development Tips

- Use Vaadin's built-in hot reload for rapid development
- Tailwind utilities can be mixed with Vaadin component classes
- Keep custom components separate from Vaadin's theme system

## shadcn/ui Integration

### Step 1: Install Core Dependencies

```bash
npm install tailwindcss-animate class-variance-authority clsx tailwind-merge lucide-react @radix-ui/react-slot
```

### Step 2: Update Tailwind Configuration

Update **tailwind.config.js** with shadcn/ui theme:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './src/main/frontend/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### Step 3: Add CSS Variables

Update **src/main/frontend/styles/globals.css**:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 94.1%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Step 4: Create Utility Functions

Create **src/main/frontend/lib/utils.ts**:

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Step 5: Create Component Directories

```bash
mkdir -p src/main/frontend/lib src/main/frontend/components/ui
```

### Step 6: Add shadcn/ui Components

**Button Component** - Create **src/main/frontend/components/ui/button.tsx**:

```typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

**Card Component** - Create **src/main/frontend/components/ui/card.tsx**:

```typescript
import * as React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

## Components Available

- **Button**: Multiple variants (default, secondary, outline, ghost, link) and sizes
- **Card**: Complete card system with header, content, title, description, footer
- **Utility Functions**: `cn()` for class merging with Tailwind

## Dark Mode Implementation

### Step 1: Create Theme Provider

Create **src/main/frontend/components/theme-provider.tsx**:

```typescript
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderContext = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialContext: ThemeProviderContext = {
  theme: 'system',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderContext>(initialContext)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'toolbox-theme',
  ...props
}: {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
} & React.ComponentProps<'div'>) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme
    if (stored) {
      setTheme(stored)
    }
  }, [storageKey])

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
```

### Step 2: Install Dropdown Menu Dependency

```bash
npm install @radix-ui/react-dropdown-menu
```

### Step 3: Create Dropdown Menu Component

Create **src/main/frontend/components/ui/dropdown-menu.tsx**:

```typescript
import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cn } from "../../lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
}
```

### Step 4: Create Mode Toggle Component

Create **src/main/frontend/components/mode-toggle.tsx**:

```typescript
import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useTheme } from "./theme-provider"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### Step 5: Add Dark Mode CSS for Vaadin Components

Add to **src/main/frontend/styles/globals.css**:

```css
/* Dark mode for Vaadin components */
.dark vaadin-app-layout {
  --lumo-base-color: hsl(222.2 84% 4.9%);
  --lumo-contrast-5pct: hsla(210, 40%, 98%, 0.05);
  --lumo-contrast-10pct: hsla(210, 40%, 98%, 0.1);
  --lumo-contrast-20pct: hsla(210, 40%, 98%, 0.2);
  --lumo-contrast-30pct: hsla(210, 40%, 98%, 0.3);
  --lumo-contrast-40pct: hsla(210, 40%, 98%, 0.4);
  --lumo-contrast-50pct: hsla(210, 40%, 98%, 0.5);
  --lumo-contrast-60pct: hsla(210, 40%, 98%, 0.6);
  --lumo-contrast-70pct: hsla(210, 40%, 98%, 0.7);
  --lumo-contrast-80pct: hsla(210, 40%, 98%, 0.8);
  --lumo-contrast-90pct: hsla(210, 40%, 98%, 0.9);
  --lumo-contrast: hsl(210, 40%, 98%);
  --lumo-header-text-color: hsl(210, 40%, 98%);
  --lumo-body-text-color: hsl(210, 40%, 98%);
  --lumo-secondary-text-color: hsl(215, 20.2%, 65.1%);
  --lumo-tertiary-text-color: hsl(215, 20.2%, 65.1%);
  --lumo-primary-color: hsl(217.2, 91.2%, 59.8%);
  --lumo-primary-text-color: hsl(217.2, 91.2%, 59.8%);
  --lumo-primary-color-50pct: hsla(217.2, 91.2%, 59.8%, 0.5);
  --lumo-primary-color-10pct: hsla(217.2, 91.2%, 59.8%, 0.1);
}

.dark vaadin-side-nav {
  --lumo-base-color: hsl(222.2 84% 4.9%);
  --lumo-contrast-10pct: hsla(210, 40%, 98%, 0.1);
}

.dark vaadin-side-nav-item {
  --lumo-base-color: hsl(222.2 84% 4.9%);
  --lumo-primary-text-color: hsl(210, 40%, 98%);
  --lumo-body-text-color: hsl(210, 40%, 98%);
}

.dark vaadin-side-nav-item[selected] {
  --lumo-primary-color: hsl(217.2, 91.2%, 59.8%);
  --lumo-primary-color-10pct: hsla(217.2, 91.2%, 59.8%, 0.1);
}

.dark vaadin-menu-bar {
  --lumo-base-color: hsl(222.2 84% 4.9%);
  --lumo-contrast-10pct: hsla(210, 40%, 98%, 0.1);
  --lumo-body-text-color: hsl(210, 40%, 98%);
}
```

### Step 6: Integrate in Layout

Update your main layout to wrap with ThemeProvider and add ModeToggle to header.

## Database Schema Configuration

### Step 1: Add Maven Profiles

Update **pom.xml** with separate database profiles:

```xml
<profiles>
    <profile>
        <id>h2</id>
        <activation>
            <activeByDefault>true</activeByDefault>
        </activation>
        <dependencies>
            <dependency>
                <groupId>com.h2database</groupId>
                <artifactId>h2</artifactId>
                <scope>runtime</scope>
            </dependency>
        </dependencies>
        <properties>
            <spring.profiles.active>h2</spring.profiles.active>
        </properties>
    </profile>
    <profile>
        <id>db2</id>
        <dependencies>
            <dependency>
                <groupId>com.ibm.db2</groupId>
                <artifactId>jcc</artifactId>
                <scope>runtime</scope>
            </dependency>
        </dependencies>
        <properties>
            <spring.profiles.active>db2</spring.profiles.active>
        </properties>
    </profile>
</profiles>
```

### Step 2: Create Profile-Specific Properties

**application-h2.properties**:
```properties
# H2 Database Configuration
spring.datasource.url=jdbc:h2:mem:toolbox;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# H2 Console (for development)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JPA Configuration for H2
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Schema Configuration
app.database.schema=PUBLIC
```

**application-db2.properties**:
```properties
# DB2 Database Configuration
spring.datasource.url=jdbc:db2://localhost:50000/toolbox
spring.datasource.driverClassName=com.ibm.db2.jcc.DB2Driver
spring.datasource.username=db2inst1
spring.datasource.password=password

# JPA Configuration for DB2
spring.jpa.database-platform=org.hibernate.dialect.DB2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# DB2 specific settings
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true

# Schema Configuration
app.database.schema=DB2INST1
```

### Step 3: Create Profile-Specific Repositories

**H2Repository Example**:
```java
@Repository("h2ReferenceRepository")
@Profile("h2")
public interface H2ReferenceRepository extends JpaRepository<ReferenceTable, Long> {
    @Query(value = "SELECT * FROM ${app.database.schema}.reference_table WHERE category = ?1", nativeQuery = true)
    List<ReferenceTable> findByCategoryNative(String category);
}
```

**DB2Repository Example**:
```java
@Repository("DB2ReferenceRepository")
@Profile("db2")
public interface DB2ReferenceRepository extends JpaRepository<ReferenceTable, Long> {
    @Query(value = "SELECT * FROM ${app.database.schema}.reference_table WHERE category = ?1", nativeQuery = true)
    List<ReferenceTable> findByCategoryNative(String category);
}
```

### Step 4: Profile-Aware Service

```java
@BrowserCallable
public class ReferenceService {
    private final JpaRepository<ReferenceTable, Long> repository;

    public ReferenceService(@Autowired(required = false) @Qualifier("h2ReferenceRepository") JpaRepository<ReferenceTable, Long> h2Repository,
                           @Autowired(required = false) @Qualifier("DB2ReferenceRepository") JpaRepository<ReferenceTable, Long> db2Repository) {
        this.repository = h2Repository != null ? h2Repository : db2Repository;
    }

    public List<ReferenceTable> list() {
        return repository.findAll();
    }
}
```

## Usage

**Run with H2 (default):**
```bash
mvn spring-boot:run
```

**Run with DB2:**
```bash
mvn spring-boot:run -Pdb2
```

## Data Initialization

### Programmatic Data Loading

Create **src/main/java/com/example/application/config/DataInitializer.java**:

```java
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);
    private final FunctionalAreaRepository functionalAreaRepository;

    public DataInitializer(FunctionalAreaRepository functionalAreaRepository) {
        this.functionalAreaRepository = functionalAreaRepository;
    }

    @Override
    public void run(String... args) {
        if (functionalAreaRepository.count() == 0) {
            log.info("Initializing functional area data...");
            
            createFunctionalArea("FI", "Financial", "Financial operations and accounting");
            createFunctionalArea("DE", "Delivery", "Package delivery and logistics");
            createFunctionalArea("WH", "Warehouse", "Inventory management and storage");
            // ... more areas
            
            log.info("Functional area data initialized. Total count: {}", functionalAreaRepository.count());
        }
    }

    private void createFunctionalArea(String code, String name, String description) {
        FunctionalArea area = new FunctionalArea();
        area.setCode(code);
        area.setName(name);
        area.setDescription(description);
        functionalAreaRepository.save(area);
    }
}
```

### Default Functional Areas

The system initializes with these depot functional areas:
- **FI** - Financial (Financial operations and accounting)
- **DE** - Delivery (Package delivery and logistics)
- **WH** - Warehouse (Inventory management and storage)
- **CS** - Customer Service (Customer support and relations)
- **OP** - Operations (Daily operational activities)
- **HR** - Human Resources (Staff management and administration)
- **IT** - Information Technology (Technology support and systems)
- **SE** - Security (Facility and cargo security)
- **QA** - Quality Assurance (Quality control and compliance)
- **MN** - Maintenance (Equipment and facility maintenance)

## Frontend Validation with Zod

### Step 1: Install Zod

Add to **package.json**:
```json
{
  "dependencies": {
    "zod": "^3.22.4"
  }
}
```

### Step 2: Create Validation Schema

Create **src/main/frontend/validation/FunctionalAreaValidation.ts**:

```typescript
import { z } from 'zod';

export const FunctionalAreaSchema = z.object({
  id: z.number().optional(),
  code: z.string()
    .min(2, 'Code must be exactly 2 characters')
    .max(2, 'Code must be exactly 2 characters')
    .regex(/^[A-Z]{2}$/, 'Code must contain only uppercase letters'),
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  description: z.string()
    .min(1, 'Description is required')
    .max(255, 'Description must be less than 255 characters')
});

export type FunctionalAreaFormData = z.infer<typeof FunctionalAreaSchema>;
```

### Step 3: Use in Forms

```typescript
import { FunctionalAreaSchema, FunctionalAreaFormData } from '../validation/FunctionalAreaValidation';

// Validate form data
const result = FunctionalAreaSchema.safeParse(formData);
if (!result.success) {
  // Handle validation errors
  console.log(result.error.issues);
}
```

## Security Configuration

### Development Users

The application includes predefined development users:

**Admin User:**
- Username: `admin`
- Password: `123`
- Roles: ADMIN, USER

**Regular User:**
- Username: `user`
- Password: `123`
- Roles: USER

### Security Fixes Applied

1. **Internationalization Compliance:**
   - Replaced `Locale.getDefault()` with `Locale.ROOT`
   - Replaced `ZoneId.systemDefault()` with `ZoneId.of("UTC")`

2. **Error Handling Improvements:**
   - Created specific exception types instead of generic exceptions
   - Added proper null checks in equals methods
   - Enhanced error messages with context

3. **Code Quality Enhancements:**
   - Extracted complex logic into separate methods
   - Improved method documentation
   - Added proper validation in factory methods

## Troubleshooting

### Frontend Development Server Issues

If you see errors like "Unable to load vaadin.js from frontend dev server":

1. **Clean and rebuild:**
   ```bash
   mvn clean compile
   ```

2. **Restart the application** - The frontend dev server should reconnect automatically

3. **Check Node.js/npm installation** - Ensure they're properly installed and in PATH

### Database Issues

1. **Data not appearing:** Ensure you're logged in with appropriate role (ADMIN for functional areas)
2. **Schema errors:** Check that `spring.sql.init.defer-datasource-initialization=true` is set
3. **Profile issues:** Verify the correct Maven profile is active

## Features Implemented

- ✅ Vaadin + React + Spring Boot foundation
- ✅ Tailwind CSS v3 integration
- ✅ shadcn/ui component library
- ✅ Dark/Light mode toggle with system preference
- ✅ Database schema configuration per profile
- ✅ Profile-specific repositories with native SQL
- ✅ Dashboard with cards and navigation
- ✅ Reference table management
- ✅ Programmatic data initialization
- ✅ Frontend validation with Zod
- ✅ Security configuration with development users
- ✅ Internationalization compliance
- ✅ Enhanced error handling
- ✅ Code quality improvements

## Next Steps

This setup provides a solid foundation for:
- Adding more shadcn/ui components (forms, dialogs, etc.)
- Implementing CRUD operations with forms
- Adding authentication and authorization
- Creating responsive layouts
- Building complex dashboard widgets
- Integrating with external APIs
- Adding real-time features with WebSockets