# PasteMax UI Components Usage Examples

This document provides examples of how to use the new UI components in the application.

## Button Component

```tsx
import { Button } from '../components/ui';

// Primary button (default)
<Button onClick={handleClick}>Primary Button</Button>

// Secondary button
<Button variant="secondary" onClick={handleClick}>Secondary Button</Button>

// Ghost button
<Button variant="ghost" onClick={handleClick}>Ghost Button</Button>

// Destructive button
<Button variant="destructive" onClick={handleClick}>Delete</Button>

// With icon
<Button startIcon={<Icon />}>With Icon</Button>

// Icon only
<Button iconOnly startIcon={<Icon />} aria-label="Icon action" />

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

## Input Component

```tsx
import { Input } from '../components/ui';
import { Search } from 'lucide-react';

// Basic input
<Input 
  placeholder="Enter text..." 
  onChange={(e) => setValue(e.target.value)} 
  value={value} 
/>

// Search input
<Input 
  placeholder="Search..." 
  isSearchInput 
  startIcon={<Search size={16} />}
/>

// With error state
<Input 
  placeholder="Email" 
  error={!isValidEmail} 
/>
```

## Switch Component

```tsx
import { Switch } from '../components/ui';

// Basic switch
<Switch 
  checked={enabled} 
  onChange={() => setEnabled(!enabled)} 
/>

// With label
<Switch 
  checked={darkMode} 
  onChange={() => setDarkMode(!darkMode)} 
  label="Dark Mode" 
/>

// Disabled switch
<Switch 
  checked={true} 
  onChange={() => {}} 
  disabled 
/>
```

## Card Component

```tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardContent,
  CardFooter,
  Button
} from '../components/ui';

// Simple card
<Card>
  <CardContent>
    This is a simple card
  </CardContent>
</Card>

// Complex card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary">Save</Button>
    <Button variant="ghost">Cancel</Button>
  </CardFooter>
</Card>

// Interactive card
<Card 
  interactive 
  onClick={handleClick} 
  selected={isSelected}
>
  <CardContent>
    Click me!
  </CardContent>
</Card>
```

## CopyButton Component

```tsx
import { CopyButton } from '../components/ui';

// Basic usage
<CopyButton text="Text to copy" />

// With file count
<CopyButton 
  text="Text to copy" 
  selectedCount={5} 
/>

// With download functionality
<CopyButton 
  text="Text to copy" 
  selectedCount={3} 
  onDownload={handleDownload} 
/>
```

## Component Combinations

### Search Bar with Button

```tsx
import { Input, Button } from '../components/ui';
import { Search } from 'lucide-react';

<div style={{ display: 'flex', gap: '8px' }}>
  <Input 
    placeholder="Search..." 
    isSearchInput 
    startIcon={<Search size={16} />} 
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <Button variant="primary" onClick={handleSearch}>
    Search
  </Button>
</div>
```

### File Selection Controls

```tsx
import { Button, CopyButton } from '../components/ui';

<div>
  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
    <Button variant="primary" onClick={handleSelectAll}>
      Select All
    </Button>
    <Button variant="secondary" onClick={handleDeselectAll}>
      Deselect All
    </Button>
  </div>
  
  <CopyButton 
    text={selectedText} 
    selectedCount={selectedFiles.length} 
    onDownload={handleDownload} 
  />
</div>
```

### Form Input with Label

```tsx
import { Input } from '../components/ui';

<div style={{ marginBottom: '16px' }}>
  <label 
    htmlFor="username" 
    style={{ 
      display: 'block', 
      marginBottom: '4px',
      fontSize: '14px',
      fontWeight: 500
    }}
  >
    Username
  </label>
  <Input 
    id="username"
    placeholder="Enter username" 
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
</div>
```

## Theme Compatibility

All components automatically adapt to the current theme (light or dark mode) based on the CSS variables defined in the application. 