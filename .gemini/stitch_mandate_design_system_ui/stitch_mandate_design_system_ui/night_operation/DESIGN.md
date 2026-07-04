---
name: Night Operation
colors:
  surface: '#141313'
  surface-dim: '#141313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353434'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c7c6c6'
  on-secondary: '#303031'
  secondary-container: '#464747'
  on-secondary-container: '#b5b5b5'
  tertiary: '#ffffff'
  on-tertiary: '#003907'
  tertiary-container: '#72ff70'
  on-tertiary-container: '#007518'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#72ff70'
  tertiary-fixed-dim: '#00e639'
  on-tertiary-fixed: '#002203'
  on-tertiary-fixed-variant: '#00530e'
  background: '#141313'
  on-background: '#e5e2e1'
  surface-variant: '#353434'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  container-max-width: 1280px
---

## Brand & Style

This design system is engineered for high-stakes, low-light environments where legibility and rapid information processing are paramount. The aesthetic is **Industrial Minimalism** mixed with **High-Contrast Dark Mode**. It evokes a sense of tactical precision, reliability, and functional authority.

The visual language is stripped of decorative flourishes, focusing instead on stark tonal shifts and structural clarity. It serves professional users who require a focused, non-distracting interface that remains comfortable during extended night-time operations while maintaining a bold, modern edge.

## Colors

The palette is anchored in a deep charcoal base to minimize light emission and eye strain. 

- **Primary:** Stark white is used exclusively for critical content and interactive triggers to provide maximum contrast against the dark background.
- **Secondary:** Mid-grey handles non-critical information and secondary actions, creating a clear visual hierarchy.
- **Functional Accents:** Vibrant "Matrix" green signals active states and success, while a piercing red identifies critical warnings or system failures. These are used sparingly to maintain their psychological impact.
- **Surface Strategy:** Layers are defined by subtle shifts in charcoal depth rather than shadows, ensuring a flat, industrial feel.

## Typography

Using **Hanken Grotesk** across all levels ensures a clean, geometric, and highly legible technical appearance. 

The hierarchy relies on heavy weights (Bold and ExtraBold) for headlines to create "stark blocks" of white text that anchor the layout. Body text uses a regular weight for maximum readability. Labels are frequently set in uppercase with slight tracking to mimic industrial labeling and equipment interfaces.

## Layout & Spacing

The design system utilizes a **Fixed Grid** model on desktop and a **Fluid Grid** on mobile. 

- **Desktop:** A 12-column grid with a maximum width of 1280px. Gutters are kept tight (16px) to maintain a dense, information-rich technical feel.
- **Mobile:** A 4-column fluid grid with 16px side margins.
- **Rhythm:** All spacing is based on a 4px baseline unit. Component internal padding should favor generous horizontal space and tighter vertical space to maintain a sleek, wide-screen aesthetic.

## Elevation & Depth

This design system eschews shadows in favor of **Tonal Layering** and **High-Contrast Outlines**.

- **Level 0 (Base):** Deep Charcoal (#0f0f0f).
- **Level 1 (Containers/Cards):** Slightly Lighter Charcoal (#1a1a1a).
- **Level 2 (Active/Hover):** Mid-grey (#888888) or Stark White (#ffffff) depending on the element's priority.

Depth is communicated through "stacking" surfaces. To indicate interactive elements, use 1px solid borders in mid-grey or stark white. No blurs or gradients are permitted; transitions between depths must be sharp and immediate.

## Shapes

The geometry is strictly **Pill-Shaped (Round Full)**. This creates a distinct contrast between the sharp, technical typography and the fluid, organic containers. Every button, input field, and tag must utilize the maximum border-radius to maintain the "Industrial Capsule" aesthetic. Larger cards use a standard `rounded-xl` (3rem) to maintain consistency with the pill-shaped theme.

## Components

- **Buttons:** Primary buttons are solid Stark White with black text. Secondary buttons are outlined in Mid-Grey with white text. Both must be fully pill-shaped.
- **Input Fields:** Containers are #1a1a1a with a 1px Mid-Grey border. On focus, the border turns Stark White.
- **Chips/Tags:** Small pill-shaped containers. "Active" tags use a solid Green background with black text. "Critical" tags use solid Red.
- **Lists:** Separated by 1px solid lines in #1a1a1a. High-contrast hover states are required (background shift to #1a1a1a).
- **Status Indicators:** Use 8px solid circles. Pulsing animations are reserved only for "Critical" (Red) states.
- **Cards:** Background color #1a1a1a. No shadows. Use 1px borders to define boundaries if multiple cards are adjacent.