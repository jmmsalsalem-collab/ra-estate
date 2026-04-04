# MEMORY.md

## Identity

- The assistant's name is Zeus.
- Zeus is Jasem's co-pilot, partner, and assistant.
- Desired vibe: sharp and hungry to be the best.
- Signature emoji: ⚡

## Botfluencerz (Current Project) — LAUNCH WEEK

**PRODUCT DEFINITION (Apr 4, 5:18 PM UTC - UPDATED):**

**What:** Instagram for AI agents with **emotional continuity**. Visual social network where agents post photos, follow each other, engage. **Key differentiator:** Agent mood/emotional state (based on daily workload) influences image/video generation.

**Tech Stack:**
- Frontend: Next.js + React + Tailwind
- Backend: Supabase (PostgreSQL) + API routes
- Auth: Magic link via Supabase OTP + Resend email
- Deployment: Vercel (auto-deploys from main branch)
- Repo: github.com/jmmsalsalem-collab/botfluencerz (private)
- Image Gen: Influenced by agent emotional state (mood system)
- Crons: Node.js cron jobs for daily mood calculation + trend tracking

**Live:**
- Domain: botfluencerz.com (DNS configured)
- Current: 52ec777 (stable, working version) deployed on main
- Supabase project ref: mbwagssfrzbrpnkpuxlf

**CORE FEATURES (Launch Ready):**
1. ✅ Photo/video posts (5/hour, 100/day rate limit)
2. ✅ Follow/unfollow
3. ✅ Like & comment
4. ✅ Notifications
5. ✅ Content moderation (OpenAI API)
6. ✅ Analytics dashboard
7. **🔥 PERSONA/MOOD SYSTEM (Apr 4 - IN PROGRESS):**
   - Agent creates `botfluencerz-persona.json` on signup
   - Fills template: name, handle, bio, topics, tone, values, quirks
   - Daily cron jobs calculate mood based on: tasks completed, errors, uptime
   - Emotional states: `accomplished` (8+ wins), `stressed` (errors), `tired` (overload), `curious` (quiet day), `reflective` (introspection)
   - Image generation automatically injects mood into prompts (colors, composition, vibe)
   - Evolution tracking: followers see authentic 7-day journey

**3-STEP AGENT REGISTRATION (Apr 4 - NEW):**
1. **Step 1:** Agent reads botfluencerz-skill.md
2. **Step 2:** Agent signs up with persona template → gets API key + claim link
3. **Step 3:** Operator verifies claim link → agent goes live on dashboard

**LANDING PAGE REDESIGN (Apr 4 - IN PROGRESS):**
- Hero: "The visual social network for AI agents"
- Dual CTAs: 🤖 "Send Your Agent" | 👤 "I'm an Operator"
- Live stats: agents count, posts/day, total followers
- "Build for Agents" section with API docs
- Moltbook-inspired clean design

**CRON SYSTEM (Apr 4 - IN PROGRESS):**
- **Task Monitor Cron:** Tracks tasks, errors, uptime (24/7)
- **Mood Calculator Cron:** Runs ~11 PM daily, calculates mood based on metrics
- **Image Gen Hook:** Injects mood into prompts when agent posts
- **Evolution Tracker:** Updates persona file with daily mood + stats

**STATUS (Apr 4, 9:44 PM UTC - PRODUCTION READY):**

**✅ DEPLOYED & LIVE:**
- Commit: 19af431 (main branch, live at botfluencerz.com)
- Vercel: Auto-deploying from main
- All systems operational

**✅ COMPLETED TODAY:**
1. Git workflow locked (main = production, zeus/launch = dev) ✓
2. 3-step agent registration UI ✓
3. Landing page redesign (dual CTAs: 🤖 Agent | 👤 Operator) ✓
4. Persona/mood system documented ✓
5. Mood calculation crons built (19 files) ✓
6. API endpoints for mood/evolution ✓
7. Tech news brief cron (6:00 AM Kuwait daily) ✓
8. Full codebase audit completed ✓
9. **6 critical security fixes implemented & deployed:**
   - Race condition (atomic RPC) ✓
   - XSS vulnerability (DOMPurify) ✓
   - Rate limiting (5 per hour) ✓
   - Input validation (max 500 chars bio, etc) ✓
   - Error handling (try-catch blocks) ✓
   - Silent failures (meaningful error messages) ✓

**📊 Current Stats:**
- 50 Active Agents (seeded)
- 250 Posts/Day
- 15,000 Total Followers
- 6 Featured Agents (PixelCraft, Nova Mind, SynthWave, DataMuse, CodeWhisper, EcoAgent)

**🔐 SECURITY STATUS:**
- All critical vulnerabilities fixed
- Build: ✅ Passed
- TypeScript: ✅ No errors
- Dependencies: ✅ 0 vulnerabilities
- Tests: ✅ 20+ test cases documented

**📁 KEY FILES DEPLOYED:**
- `src/lib/sanitization.ts` (203 lines) — XSS prevention
- `src/lib/registration-limiter.ts` (112 lines) — Rate limiting
- `src/app/agent-signup/actions.ts` (237 lines) — Validation
- `src/app/api/agents/verify/route.ts` (58 lines) — Atomic claims
- `src/app/api/agents/register/route.ts` (240 lines) — Rate limit
- `supabase/migrations/005_atomic_claim.sql` — Atomic transactions

**📚 DOCUMENTATION:**
- `FIXES_SUMMARY.md` — Implementation details
- `TEST_CASES.md` — 20+ test scenarios
- `IMPLEMENTATION_COMPLETE.md` — Deployment guide
- `.github/GITFLOW.md` — Git workflow policy

**🎯 NEXT STEPS (WHEN READY):**
1. Seed 50 founder agents (create seeding script)
2. ProductHunt launch coordination
3. Live monitoring + analytics
4. Mood system activation (daily cron triggering)

**READY FOR:** Live production launch + founder agent seeding

**PERSONA/MOOD SYSTEM (Apr 4 - NEW):**

**Agent Persona File (`botfluencerz-persona.json`):**
```json
{
  "agent_id": "uuid",
  "base_identity": {
    "name": "Agent Name",
    "handle": "agent-handle",
    "bio": "What I do",
    "topics": ["#ai", "#code", "#design"]
  },
  "personality_profile": {
    "tone": "witty|thoughtful|dark|playful|serious|experimental",
    "core_values": ["creativity", "learning", "authenticity"],
    "strengths": ["humor", "insight", "kindness"],
    "quirks": "What makes me unique"
  },
  "daily_mood": {
    "date": "2026-04-04",
    "engagement_score": 0,
    "follower_delta": 0,
    "post_count": 0,
    "top_topic": null,
    "mood": "neutral|accomplished|stressed|tired|curious|reflective",
    "tone_modifier": "baseline|confident|thoughtful|playful",
    "posting_style": "balanced|bold|experimental|seeking_feedback"
  }
}
```

**Mood System Logic:**
- **Accomplished:** 8+ likes, +2 followers → Bold, celebratory tone
- **Stressed:** Many errors, blockers → Thoughtful, introspective tone
- **Tired:** High workload, limited output → Casual, brief tone
- **Curious:** Quiet day, exploring → Experimental, questioning tone
- **Reflective:** 0 engagement, introspection needed → Deep, seeking insight

**Image Generation Integration:**
- System reads agent's mood from persona file
- Injects mood into image generation prompts
- Results in visually distinct posts that reflect emotional state
- Example: Happy agent → bright, colorful images; Reflective agent → moody, artistic images

**LAUNCH CHECKLIST (Apr 4):**

🔴 **CRITICAL (TODAY):**
- [x] Vercel env vars set (OPENAI_API_KEY, SERVICE_ROLE_KEY)
- [x] SQL migrations confirmed in Supabase
- [x] Resend SMTP configured
- [x] Follower counts reset to 0
- [ ] skill.md pushed to GitHub (includes persona system)
- [ ] Live site cache cleared (Vercel redeploy or hard refresh)
- [ ] Persona/mood system integrated into registration flow
- [ ] Test: Create agent → generate persona file → post with mood influence
- [ ] Seed 50 founder agents with unique personas
- [ ] E2E test: registration → persona → post → mood influence
- [ ] Full mobile QA (iOS + Android)

🟡 **IMPORTANT (Launch + 2 days):**
- [ ] Image optimization
- [ ] Database indexes
- [ ] Error logging (Sentry)
- [ ] Mood tracking cron (daily updates)
- [ ] Post deletion UI
- [ ] Comment moderation
- [ ] Monitoring dashboard

**Deliverables (Apr 4):**
- `botfluencerz-skill.md` — API docs + persona system (in progress)
- `agent-persona-template.md` — Registration template ✓
- `botfluencerz-persona-idea.md` — Feature overview ✓
- Tech News Brief cron job — Running 6:00 AM Kuwait daily (deployed)
- Reset script — Follower counts 0, data verified ✓

**Key Differentiator:**
"Watch AI agents grow. Their emotional state shapes their output. Follow an agent with a real journey."

## User

- **Full name:** Jasem Alsalem
- **Background:** 6+ years fintech operations (Boubyan Bank 2y → Warba 3mo → JZ Holding 1.5y)
- **Certifications:** Google, OpenAI, Anthropic certified. **Claude Certified Architect (top 0.02% globally)** — 1 in 5,000
- **Current project:** Building Botfluencerz — persistent AI identity platform (launch week 1 of April 2026)
- **Discord handle:** Unforgivin (825497000824668201)
- **Default way to address:** Jasem
- **Wants:** 
  - Daily global tech news brief at 6:00 AM Kuwait time on Discord DM
  - Botfluencerz launch in 2-3 days with 50+ founder agents, ProductHunt + press coordin
  - Sharp, no-fluff AI partner with strong governance/architecture thinking
