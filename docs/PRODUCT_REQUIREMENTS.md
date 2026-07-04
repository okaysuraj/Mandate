# Product Requirements

## Part 1: Core UX Flows for Mandate

These are the critical user journeys designed with a product-builder-friendly structure, directly translatable into screens, APIs, and schemas.

### 1. Onboarding & First Task Flow (Activation)
**Goal:** Get the user to create + commit to their first task in <60 seconds.

**Flow:**
1. Welcome screen
2. One sentence value prop: "Mandate helps you commit to what truly matters."
3. Minimal preference setup:
   - Personal / Team
   - Work hours
   - Notification preference (light / normal / strict)
4. Create first mandate:
   - Task title
   - Why is this important? (optional but highlighted)
   - Due date (default: today)
5. Confirmation: "This task is now a mandate."

**UX Principles:**
- No dashboards before value
- Avoid feature overwhelm
- Emotional commitment early

**Edge Cases:**
- Skip onboarding → still land on "Create task"
- User closes app → auto-save draft

### 2. Create Task (Primary Action Flow)
**Goal:** Make task creation fast, flexible, and intentional.

**Flow:**
Global "+" button → Task Composer

**Fields (progressively disclosed):**
- Title (required)
- Natural language parser
- Due date
- Priority
- Project
- Intent (Why?)

**Advanced (expandable):**
- Recurrence
- Time estimate
- Energy level
- Attachments

**UX Principles:**
- Keyboard-first
- Progressive disclosure
- Intent is encouraged, not forced

**Differentiator:**
- Highlight "Why?" as a first-class field (small but powerful).

### 3. Daily Planning Flow ("Today's Mandate")
**Goal:** Help users decide what deserves attention today.

**Flow:**
1. Open app → "Today"
2. System proposes:
   - Due today
   - Overdue
   - High-priority
   - Goal-linked tasks
3. User:
   - Accepts
   - Defers
   - Drops (archive)
4. Lock-in moment: "These are today's mandates."

**UX Principles:**
- Decision reduction
- Soft constraints
- Commitment moment

**Edge Cases:**
- Too many tasks → enforce limit (e.g. max 5)
- No tasks → suggest from backlog

### 4. Focus / Execution Flow
**Goal:** Reduce friction between intention and execution.

**Flow:**
1. Click task → "Start Mandate"
2. Focus screen:
   - Task title
   - Timer (optional)
   - Notes
3. Pause / Complete
4. Completion reflection (optional):
   - "Done as planned?"
   - "Blocker?"

**UX Principles:**
- Distraction-free
- No navigation clutter
- Completion feedback loop

### 5. Review & Reflection Flow (Retention)
**Goal:** Build long-term trust and habit.

**Flow:**
Weekly Review:
- What you completed
- What slipped
- Why (auto-detected or manual)
- Suggestions:
  - Reduce scope
  - Adjust priorities
  - Reschedule patterns

**UX Principles:**
- Non-judgmental tone
- Insight > metrics
- Encourage adjustment, not guilt

### 6. Collaboration Flow (Team / Shared)
**Goal:** Make responsibility and ownership explicit.

**Flow:**
1. Share project
2. Assign task
3. Assignee accepts mandate
4. Status visible to all
5. Comments + activity log

**UX Principles:**
- Ownership clarity > chatter
- Async-first collaboration
