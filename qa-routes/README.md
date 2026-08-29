# QA route reference

How to use these files to manually check that role-based screen access
actually changes, since there's no real login yet (that's Phase 6).

1. Run the app (`npm run dev` or `npm run start`), open `http://localhost:3000`.
2. Click the flask icon (🧪) in the header, top-right — that's the dev-only
   **Role Switcher**. Pick a role; the sidebar and available pages update
   immediately, no reload needed.
3. Open the file for that role below and click through its routes. Any
   route NOT listed for that role should no longer appear in the sidebar —
   if you type it into the URL bar directly it will still render (there's
   no server-side auth yet to block it, only the nav is hidden), which is
   expected for this UI-only phase.
4. One route is special: **Technician** role + a browser window narrower
   than **768px** replaces the entire sidebar/header with a phone-style
   shell (bottom tab bar: Today/Jobs/Schedule/Profile). Try it at normal
   desktop width first, then narrow the window, to see both states.

Files:
- [admin.md](./admin.md) — full access
- [dispatcher.md](./dispatcher.md)
- [technician.md](./technician.md)
- [accountant.md](./accountant.md)

Sample record IDs (for testing the `/…/[id]` detail pages) live at the
bottom of each role's file, limited to what that role can actually reach
from its own sidebar.
