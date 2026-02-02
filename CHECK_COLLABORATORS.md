# Check Repository Collaborators

## Who Has Access?

To see who has access to your GitHub repository:

1. **Go to GitHub Repository Settings:**

   - Visit: https://github.com/unboxthemoment/unbox-the-moment-website/settings/access
   - Or: Repository → Settings → Collaborators & teams

2. **Check Collaborators:**

   - See who has read/write/admin access
   - Remove anyone who shouldn't have access

3. **Check Organization Members:**
   - Go to: https://github.com/organizations/unboxthemoment/people
   - See all organization members
   - Check their roles and permissions

## About mcnaveen

Based on the commit history, `mcnaveen` has made significant contributions:

- Upgraded Next.js to 15.5.9
- Refactored to Next.js 15 and Tailwind 4
- Enhanced Stripe webhook functionality
- Made style updates

**Possible scenarios:**

1. **Legitimate collaborator** - They were added as a collaborator/contributor
2. **Organization member** - They're part of the `unboxthemoment` org
3. **Previous developer** - They worked on the project before
4. **Contributor via PR** - They submitted pull requests that were merged

## What to Do

### If They Should Have Access:

- No action needed
- They're a legitimate collaborator

### If They Shouldn't Have Access:

1. **Remove them as collaborator:**

   - Repository → Settings → Collaborators
   - Find `mcnaveen` → Remove

2. **Remove from organization** (if applicable):

   - Organization → People → Find user → Remove

3. **Review their commits:**

   - Make sure nothing malicious was added
   - Check: `git log --author="mcnaveen" --stat`

4. **Consider reverting their changes** (if needed):
   ```bash
   # See what files they changed
   git log --author="mcnaveen" --name-only --pretty=format:"" | sort -u
   ```

## Check Their GitHub Profile

Visit their profile to learn more:

- https://github.com/mcnaveen
- Or: https://github.com/8493007+mcnaveen

This will show:

- Their public profile
- Other repositories they contribute to
- Their activity

---

**Recommendation:** Check the repository collaborators list first to see if they're still an active collaborator or if this is just historical commits from when they had access.
