# Standard Task Prompt Template

Use this template when creating task prompts for execution agents (Hosu Poika, etc.).

## Purpose
Ensures all prompts comply with WORKER_RULES.md Execution Verification Protocol and include necessary governance file references, clear instructions, and completion verification.

## Template Structure
```
Hosu Poika — TASK: [Descriptive task name]

CONTEXT
[Why this task exists, what problem it solves, what it accomplishes]

INSTRUCTIONS
1. Read order (mandatory):
   - STATE.md
   - WORKER_RULES.md
   - DECISIONS.md
   - TASKS.md (if creating/updating tasks)
   - [Any other relevant governance or data files]

2. [First concrete action step]

3. [Second concrete action step]

4. [Continue with numbered steps...]

X. Update LOG.md (append):
```
- [Task ID]: [Brief description of what was done]
- [Key changes/additions]
- [Any notable outcomes]
```

X+1. Update TASKS.md:
   - Create/update task with ID: [TASK_ID]
   - Mark status as: completed

X+2. VERIFY completion before STOP:
   □ [Specific deliverable 1 created/modified]
   □ [Specific deliverable 2 created/modified]
   □ [LOG.md appended with execution record]
   □ [TASKS.md updated with correct status]
   □ [STATE.md updated if project truth changed]

   If any checkbox unchecked:
   - Task status remains: in_progress
   - Log gap in LOG.md
   - STOP immediately

X+3. STOP

DONE
```

## Checklist for Well-Formed Prompts

Before sending prompt to execution agent, verify:

✓ **Context provided**: Agent understands WHY, not just WHAT
✓ **Read order specified**: Governance files listed explicitly
✓ **Steps numbered**: Clear sequence, no ambiguity
✓ **Verification checklist included**: Specific deliverables listed
✓ **STOP instruction present**: Clear end signal

## Common Patterns

### File Creation Task
```
2. Create file `/path/to/file.ext` with this content:
[full content here or clear specification]
```

### File Modification Task
```
2. Update file `/path/to/file.ext`:
   - Find section: [identifier]
   - Add/replace with: [exact content]
```

### Documentation Task
```
X. Update LOG.md (append):
X+1. Update TASKS.md:
X+2. If applicable, update STATE.md:
```

### Multi-File Task
```
X. VERIFY completion before STOP:
   □ File A created
   □ File B modified
   □ File C contains expected section
   □ LOG.md appended
   □ TASKS.md updated
```

## Anti-Patterns (Avoid)

❌ **Vague instructions**: "Update the config file appropriately"
✅ **Concrete instructions**: "Add `port: 8000` to vite.config.js server section"

❌ **Missing verification**: "Update LOG.md and STOP"
✅ **Explicit checklist**: "VERIFY: □ LOG.md appended? □ TASKS.md updated?"

❌ **No read order**: Assumes agent knows what to read
✅ **Explicit read order**: "Read: STATE.md, WORKER_RULES.md, DECISIONS.md"

❌ **Speculative scope**: "Improve performance as you see fit"
✅ **Bounded scope**: "Change timeout from 5000ms to 10000ms in config"

## Example: Full Well-Formed Prompt
```
Hosu Poika — TASK: Add canonical port to STATE.md

CONTEXT
Desktop runtime verified working on port 8000. Need to document this as canonical in STATE.md for future reference.

INSTRUCTIONS
1. Read order:
   - STATE.md
   - WORKER_RULES.md

2. Open STATE.md

3. Find section: "## Development Setup"

4. After "Runtime: Vite dev server on port 8000", add:
```
**Canonical Port: 8000**
This port is configured in vite.config.js and verified working. Do not change without explicit approval.
```

5. Update LOG.md (append):
```
- STATE.md: Added canonical port documentation (8000)
- Port 8000 marked as verified and frozen
```

6. VERIFY completion before STOP:
   □ STATE.md contains new "Canonical Port: 8000" text
   □ LOG.md appended

   If any checkbox unchecked: log gap, STOP

7. STOP

DONE
```

## Maintenance Notes

This template evolves. When WORKER_RULES.md changes significantly or new patterns emerge, update this template to reflect current best practices.

Last updated: [Will be filled by HP]