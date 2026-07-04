---
name: Mandate Industrial Minimalist
colors:
  surface: '#f9f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f9f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f5'
  surface-container: '#edeef0'
  surface-container-high: '#e7e8ea'
  surface-container-highest: '#e1e2e4'
  on-surface: '#191c1e'
  on-surface-variant: '#444748'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f3'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#5d5e60'
  on-secondary: '#ffffff'
  secondary-container: '#dfdfe1'
  on-secondary-container: '#616365'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002108'
  on-tertiary-container: '#00983d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#e2e2e4'
  secondary-fixed-dim: '#c6c6c8'
  on-secondary-fixed: '#1a1c1d'
  on-secondary-fixed-variant: '#454749'
  tertiary-fixed: '#69ff87'
  tertiary-fixed-dim: '#3ce36a'
  on-tertiary-fixed: '#002108'
  on-tertiary-fixed-variant: '#00531e'
  background: '#f9f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e4'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.1em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  container-max: 1440px
  gutter: 24px
---

## Brand & Style
This design system embodies a high-fidelity, industrial-grade productivity aesthetic. It is engineered for professionals who demand precision, clarity, and a premium feel. The brand personality is authoritative yet unobtrusive, prioritizing functional density through a minimalist lens.

The design style is **High-Contrast Minimalism**. It utilizes a "Raw Tech" philosophy—relying on stark monochrome values, generous whitespace to reduce cognitive load, and razor-sharp execution of a bento-style grid. The interface should feel like a high-end physical tool: cold, reliable, and meticulously crafted.

## Colors
The palette is strictly monochromatic to maintain an "industrial-grade" focus. 

- **Core Tones:** #1A1A1A is used for primary text and high-impact surfaces. The background remains light (#F9F9FB) with pure #FFFFFF used for active cards and containers to create subtle layer separation.
- **Accents:** Color is used only as a functional indicator, never for decoration. High-contrast Green (#00C853) is reserved for success states or critical active pulses.
- **Grays:** Functional grays (#F3F3F5 and #D9DADC) define boundaries and secondary information without breaking the high-contrast rhythm.

## Typography
Typography is the primary visual driver of the system. 

- **Primary Type:** **Hanken Grotesk** provides a geometric, modern foundation. Large headlines utilize heavy weights (700-800) with tight tracking to evoke an editorial, high-tech feel.
- **Industrial Labels:** **JetBrains Mono** is used for all metadata, technical labels, and status indicators. This adds a "coded" or "manufactured" quality to the interface.
- **Styling:** Use uppercase transformations for Display levels and small-caps for utility labels to establish a clear hierarchy between content and interface controls.

## Layout & Spacing
The layout follows a **Precision Grid** model based on a 4px/8px base unit. 

- **Grid:** A 12-column fluid grid for desktop with fixed gutters of 24px. 
- **Bento Logic:** Features and data visualizations are housed in "Bento Grids"—modular, rectangular containers that scale based on the 8px rhythm. 
- **Whitespace:** Use generous margins (64px+) between major sections to emphasize the "Minimalist High-Tech" aesthetic. 
- **Mobile:** Transition to a 4-column grid with 16px margins, stacking bento modules vertically while maintaining internal padding.

## Elevation & Depth
This design system avoids traditional shadows to maintain a flat, industrial profile. 

- **Layering:** Hierarchy is communicated through **Tonal Layers**. Elements sit on the #F9F9FB background. Active "cards" or "workspaces" use #FFFFFF. 
- **Outlines:** Low-contrast borders (#D9DADC) are used for secondary containers.
- **Interactions:** Subtle background shifts to #F3F3F5 are used for hover states on list items and secondary buttons. 
- **Focus:** Sharp, high-contrast borders (2px #1A1A1A) indicate active focus or selection, reinforcing the "precision tool" metaphor.

## Shapes
The shape language is a deliberate contrast between the rigid grid and the fluid controls. 

- **Modules:** Bento containers and main cards use a subtle "Rounded" (0.5rem) corner to feel modern.
- **Controls:** All interactive elements like buttons, input chips, and tags are **fully pill-shaped** (rounded-full). This ensures touchpoints are instantly recognizable against the geometric grid layout.

## Components
- **Buttons:** 
    - *Primary:* Solid #1A1A1A background with #FFFFFF text. Pill-shaped.
    - *Secondary:* Outlined 1px #D9DADC. Pill-shaped.
- **Inputs:** Minimalist bottom-border only or very light #F3F3F5 filled backgrounds with JetBrains Mono for placeholder text.
- **Cards:** Flat surface containers. Use thin 1px #D9DADC borders for grouping data. No shadows.
- **Chips/Status:** Pill-shaped, using JetBrains Mono in small-caps. Background colors match the status (e.g., light green tint with dark green text for "Success").
- **Lists:** High-density, separated by 1px #F3F3F5 dividers. Hover state trigger: #F3F3F5 background fill.
- **Bento Modules:** Used for dashboard summaries. Each module must have a 32px internal padding for a premium, spacious feel.