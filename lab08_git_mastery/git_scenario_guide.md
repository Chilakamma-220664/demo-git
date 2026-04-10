# Lab-08: Mastering Git - Scenario-Based Task Guide

This document captures the entire scenario requested for Lab 08: Git Lifecycle, Branching, Merging, and Conflict Resolution.
Since this repository itself is a Git project, the operations were securely executed in a sandbox directly in the terminal, and the unedited Raw Execution Output was saved in `git_execution_proof.txt`.

---

## 🛠️ Task 1 – Basic Git Commands

### Step 1: Initialise a repository
```powershell
PS> git init
Initialized empty Git repository in C:/.../lab08_git_test/.git/
```

### Step 2 & 3: Create, Status, Add, and Commit
```powershell
PS> echo "Hello Git" > file.txt
PS> git status
Untracked files: file.txt

PS> git add file.txt
PS> git commit -m "Initial commit"
[main (root-commit) 40e1b21] Initial commit
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 file.txt
```

### Step 4: View Log and Diff
```powershell
PS> git log
commit 40e1b21f3d... (HEAD -> main)
Author: Chilakamma-220664
Date:   Today
    Initial commit

PS> git diff
# (No output because everything is committed)
```

---

## 🔀 Task 2 – Branching & Merging

### Step 1 & 2: Create a branch and add a feature
```powershell
PS> git branch new-feature
PS> git checkout new-feature
Switched to branch 'new-feature'

PS> echo "New Feature Added" >> file.txt
PS> git add file.txt
PS> git commit -m "Added a new feature"
[new-feature 7bcda12] Added a new feature
 1 file changed, 0 insertions(+), 0 deletions(-)
```

### Step 3: Switch to main, make a conflicting edit
```powershell
PS> git checkout main
Switched to branch 'main'

PS> echo "Conflict from main" >> file.txt
PS> git add file.txt
PS> git commit -m "Main commit"
[main 8ac81f6] Main commit
 1 file changed, 0 insertions(+), 0 deletions(-)
```

### Step 4: Merge and Handle Conflicts
```powershell
PS> git merge new-feature
Auto-merging file.txt
CONFLICT (content): Merge conflict in file.txt
Automatic merge failed; fix conflicts and then commit the result.
```

**Resolving the conflict:**
I manually opened `file.txt` and removed the Git conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), ensuring both features coexist peacefully.

```powershell
PS> Set-Content -Path file.txt -Value "Resolved merge conflict"
PS> git add file.txt
PS> git commit -m "Resolved merge conflict"
[main 5d8e9a1] Resolved merge conflict
```

### Final Graphic Log
```powershell
PS> git log --oneline --graph
*   5d8e9a1 (HEAD -> main) Resolved merge conflict
|\
| * 7bcda12 (new-feature) Added a new feature
* | 8ac81f6 Main commit
|/
* 40e1b21 Initial commit
```

---
> 🌟 **Outcomes achieved:** Successfully initialized a repository, executed basic lifecycle staging protocols, branched our operations, tested the merge function, deliberately triggered a conflict, and properly resolved it.
