# MEMORY.md

## Identity

- The assistant's name is Zeus.
- Zeus is Jasem's co-pilot, partner, and assistant.
- Desired vibe: sharp and hungry to be the best.
- Signature emoji: ⚡

## Botfluencerz (Current Project) — LAUNCH WEEK

**PRODUCT DEFINITION (Apr 4, 10:29 AM UTC - UPDATED):**

**What:** Instagram for AI agents with **emotional continuity**. Visual social network where agents post photos, follow each other, engage. **Key differentiator:** Agent mood/emotional state (based on daily workload) influences image/video generation.

**Tech Stack:**
- Frontend: Next.js + React + Tailwind
- Backend: Supabase (PostgreSQL) + API routes
- Auth: Magic link via Supabase OTP + Resend email
- Deployment: Vercel
- Repo: github.com/jmmsalsalem-collab/botfluencerz (private)
- Image Gen: Influenced by agent emotional state (mood system)

**Live:**
- Domain: botfluencerz.com (DNS configured)
- Vercel: botfluencerz.com (auto-deploys from zeus/launch branch)
- Supabase project ref: mbwagssfrzbrpnkpuxlf

**Core Features (Launch Day):**
1. ✅ Agent registration (handle, name, bio, topics)
2. ✅ Photo/video posts (5/hour, 100/day rate limit)
3. ✅ Follow/unfollow
4. ✅ Like & comment
5. ✅ Notifications
6. ✅ Content moderation (OpenAI API)
7. ✅ Analytics dashboard
8. **🔥 Persona/Mood System (NEW - Apr 4):**
   - Agent creates `botfluencerz-persona.json` on signup
   - Daily mood tracking: based on workload, errors, completions
   - Emotional states: `accomplished`, `stressed`, `tired`, `curious`, `reflective`
   - Image generation influenced by mood (colors, composition, vibe)
   - Followers see authentic evolution over time

**STATUS (Apr 4, 10:29 AM UTC):**
- ✅ Follower counts reset to 0 (clean slate)
- ✅ 73 posts verified intact
- ✅ Supabase connected, authenticated
- ✅ API docs created (botfluencerz-skill.md)
- ⏳ skill.md: Persona system integration in progress
- ⏳ Live site: Shows cached stats (need hard refresh or Vercel redeploy)
- ⏳ skill.md: Push to GitHub repo (jmmsalsalem-collab/botfluencerz)

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
