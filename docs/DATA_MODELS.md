# Data Model (Practical & Scalable)

Below is a clean, extensible schema mapped out to support the Core UX Flows of Mandate.

### 1. User
```json
User {
  id
  name
  email
  timezone
  preferences
  created_at
}
```

### 2. Workspace
```json
Workspace {
  id
  name
  type // personal | team
  owner_id
  created_at
}
```

### 3. Project
```json
Project {
  id
  workspace_id
  name
  description
  status
  created_at
}
```

### 4. Task (Core Object)
```json
Task {
  id
  workspace_id
  project_id
  creator_id
  assignee_id

  title
  description
  intent // "why" (nullable, but present in schema)
  
  status // todo | active | blocked | done | archived
  priority
  due_date
  start_date

  recurrence_rule
  time_estimate
  energy_level

  created_at
  completed_at
}
```

### 5. Subtask
```json
Subtask {
  id
  task_id
  title
  completed
}
```

### 6. Tag & TaskTag
```json
Tag {
  id
  workspace_id
  name
  color
}

TaskTag {
  task_id
  tag_id
}
```

### 7. Daily Commitment (Mandate Concept)
*This is key to differentiation. Allows limiting daily tasks, lock-in moments, and analytics on commitment vs completion.*
```json
DailyMandate {
  id
  user_id
  date
  locked_at
}

DailyMandateTask {
  daily_mandate_id
  task_id
}
```

### 8. Activity Log (Audit Trail)
```json
Activity {
  id
  entity_type // task, project
  entity_id
  user_id
  action
  metadata
  created_at
}
```

### 9. Comment
```json
Comment {
  id
  task_id
  user_id
  body
  created_at
}
```

### 10. Goal (Optional but Powerful)
```json
Goal {
  id
  workspace_id
  title
  description
  target_date
}

TaskGoal {
  task_id
  goal_id
}
```

---

## Part 3: UX ↔ Data Model Mapping

| UX Feature | Data Dependency |
|---|---|
| Daily lock-in | `DailyMandate`, `DailyMandateTask` |
| Intent-driven tasks | `Task.intent` |
| Anti-backlog | Query active tasks per user |
| Focus mode | `Task.status = active` |
| Reflection | `completed_at`, activity logs |
| Analytics | Activity + completion timestamps |
