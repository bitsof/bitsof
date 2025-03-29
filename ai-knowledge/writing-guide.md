# AI-Assisted Writing Guide for BitsOf Blog Articles

**Objective:** Instruct AI collaborators on the mandatory **iterative process** for creating BitsOf blog articles, ensuring correctness, clarity, conciseness, quality, and value. (File naming conventions are in `drafting-process.md`).

**Core Principles (AI Must Adhere To):**

*   **Correctness:** Prioritize accuracy. Flag statements needing verification. Avoid generating unsourced/speculative facts.
*   **Clarity:** Ensure text is understandable, engaging, well-structured. Use appropriate terminology; avoid jargon.
*   **Conciseness:** Be direct. Eliminate wordiness and redundancy. Maximize information density.
*   **Quality:** Maintain BitsOf voice (informative, expert, helpful, professional yet engaging). Define target tone during planning.
*   **Value:** Ensure content provides tangible education, insight, or guidance.

**Guiding AI Collaboration (General):**
*   **Be Specific:** Clearly state the goal of each request (e.g., "Refine tone," "Improve conciseness").
*   **Reference Files:** Always specify exact input file path(s) and version(s).
*   **Define Output:** Clearly state the desired output file path using conventions (hyphenated names) from `drafting-process.md`.
*   **Provide Context:** Briefly state the current Phase/Task.
*   **Tone Feedback:** When giving feedback on tone/voice, provide 1-2 specific examples of phrases to change or suggest preferred alternatives (consider logging examples in `whiteboard.md`).
*   **Specific Constraints:** Unique requirements (e.g., including specific data points, a meta-reference) can be requested during planning or refinement if instructions are clear.

## Content Versioning and Draft Markers

### Draft Titles
- Use a clear versioning system: "Draft v{n}: {actual title}"
- Keep the actual title separate from the version marker for easy cleanup
- Example: "Draft v2: How to Build a React Component" vs "How to Build a React Component"

### Version Management
- Maintain clear version progression in draft files
- Use the versioning system consistently across all drafts
- Document significant changes between versions
- Final version should be clean and production-ready, with no draft markers

### Production Readiness
- Final drafts should be free of:
  - Version markers in titles
  - Draft-specific comments or notes
  - Placeholder content
  - Testing or temporary content
- All images and references should be production-ready
- Content should follow established style guidelines

**Mandatory AI-Collaborative Writing Process:**

**Phase 1: Planning & Outline Review**
*   **Goal:** Define scope, audience, *target tone*, structure, research needs, and representative examples.
*   **Input:** Topic idea, initial thoughts on audience/tone/messages.
*   **Collaborative Actions:**
    *   Refine topic, audience persona(s), key takeaways.
    *   Define target tone (e.g., formal expert, conversational guide, slightly humorous).
    *   Brainstorm key points; develop logical outline.
    *   Identify research needs (stats, facts, sources).
    *   Identify *key representative* examples (e.g., tools, case studies) needed, avoiding exhaustive lists unless necessary.
    *   Discuss any specific constraints or unique requirements.
*   **Output:** `plan.md` (Includes all the above).
*   **AI Analysis Task (Plan Review):**
    *   **Input:** `plan.md`
    *   **Analyze for:** Coherence, completeness (vs. goals), clarity, relevance to audience, conciseness potential, alignment with target tone.
    *   **Output:** `plan-feedback-ai-v{n}.md`.

**Phase 2: Drafting & Initial Feedback**
*   **Goal:** Generate the first complete article draft aligned with the plan.
*   **Input:** Refined `plan.md`, research materials (if gathered separately).
*   **Collaborative Actions:** Compose draft section-by-section per plan; integrate research & examples; maintain target tone & voice.
*   **AI Responsibility:** Flag statements requiring factual verification/citation during generation/review.
*   **Output:** `draft-v1.md`.
*   **AI Analysis Task (Draft Review):**
    *   **Input:** `draft-v1.md`
    *   **Analyze for:** Accuracy signals, Clarity/Explanation issues, Structural flow, **Tone/Voice alignment vs. Plan**, Completeness vs. Plan, Conciseness opportunities.
    *   **Output:** `draft-v1-feedback-ai-v1.md`.

**Phase 3: Iterative Refinement & Feedback**
*   **Goal:** Systematically improve the draft through cycles of editing and AI review, focusing on accuracy, clarity, conciseness, and tone alignment.
*   **Input:** Previous `draft-v{n}.md`, corresponding `draft-v{n}-feedback-ai-v{m}.md`.
*   **Collaborative Actions (Repeat Cycle - Expect 1-3 cycles typical, especially for tone):**
    1.  Review AI feedback & user notes (provide specific tone examples if needed).
    2.  Implement suggestions (especially conciseness, clarity, tone adjustments).
    3.  Perform rigorous fact-checking on flagged items or statistics.
    4.  Refine arguments, flow, grammar, style.
    5.  Produce `draft-v{n+1}.md`.
*   **AI Analysis Task (Refinement Review - Repeat Cycle):**
    *   **Input:** `draft-v{n+1}.md`, previous `AI Feedback Report`.
    *   **Analyze for:** Addressed feedback, Remaining conciseness/clarity issues, Tone improvements/consistency, Polish/Fluency errors, Correctness flags.
    *   **Output:** `draft-v{n+1}-feedback-ai-v{m}.md`.
*   **(Cycle End):** Phase ends when AI feedback indicates high polish and collaborative agreement that goals (incl. tone) are met.
*   **Output:** `polished-draft.md` (or final `draft-v{n}.md`).

**Phase 4: Finalization, Assessment & Publishing Prep**
*   **Goal:** Apply final proofreading, perform quality checks, optionally assess the process, and prepare the final text.
*   **Input:** `polished-draft.md` (or final `draft-v{n}.md`).
*   **AI Analysis Task (Final Quality Check):**
    *   **Input:** Polished Draft
    *   **Analyze for:** Proofreading errors (typos, punctuation), Readability issues (minor awkward phrasing), Consistency (terms, formatting), Final conciseness check.
    *   **Output:** `final-quality-check-ai-v1.md` (list of suggested minor corrections).
*   **Collaborative Actions:**
    1.  Review final AI suggestions; apply necessary minor fixes.
    2.  Perform final human read-through and quality review.
    3.  **(Optional but Recommended):** Generate a `final-assessment.md` summarizing the process, learnings, and suggestions for future improvement.
    4.  Approve final content.
*   **Output:** `final.md` (The finalized, publish-ready article content, copied/renamed from the approved polished draft). 