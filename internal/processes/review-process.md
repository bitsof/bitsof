# AI Review Battery Process

**Objective:** To define a structured, **automated process** for evaluating a draft article against multiple quality axes using specialized AI reviewer personas (defined in `ai-personas.md`), driving iterative improvement based on quantitative scoring.

**Core Principle:** Different AI personas excel at evaluating different quality aspects. A competitive, rating-based evaluation provides clear targets for automated improvement.

**Integration:** This process forms the core of **Phase 3 (Automated Iterative Refinement)** as described in `writing-guide.md`.

## Automated Competitive Review Cycle (Phase 3)

During the automated refinement loop, the AI performs a multi-persona evaluation on each generated draft (`draft-v{n+1}.md`) to drive targeted improvements.

1.  **Multi-Axis Evaluation (The Competition):** The AI invokes the relevant Review Battery Personas simultaneously (or sequentially) against the current draft. Each persona is tasked not just with providing qualitative feedback, but primarily with **assigning a score or rating** (e.g., 1-10) for its specific domain:
    *   Hook Doctor -> Hook Effectiveness Score
    *   Structure Strategist -> Structural Soundness Score
    *   Clarity Captain -> Clarity Score
    *   Conciseness Coach -> Conciseness Score
    *   Personality Polisher -> Personality/Engagement Score
    *   Fact Checker -> (Flags items, may not provide a single score but a count/list of issues)
    *   General Reviewer -> Overall Polish Score (considering all aspects)

2.  **Score Synthesis & Weakness Identification:** The AI gathers the scores from each persona.
    *   It identifies the axes with the lowest scores, representing the areas needing the most improvement.
    *   Qualitative feedback from the personas associated with low scores is prioritized.
    *   Fact-checking flags are always carried forward.

3.  **Targeted Self-Correction Input:** The AI prepares input for its next revision cycle, specifically instructing itself to focus on improving the lowest-scoring aspects. For example:
    *   If the Structure Score is low, the next revision prioritizes reordering sections or improving transitions.
    *   If the Personality Score is low, the next revision focuses on making the language more engaging or aligning better with the target tone.
    *   If Clarity is low, simplifying sentences and explanations becomes the priority.

4.  **Iterative Improvement Goal:** The objective of each automated loop is to **increase the scores** across all evaluated axes, using the ratings as a guide for targeted refinement. The loop continues until scores reach a predefined threshold, stabilize, or a maximum number of iterations is hit.

5.  **Final Output to User:** At the end of the automated loops, the system presents:
    *   The final `polished-draft.md`.
    *   A `final-evaluation-report.md` showing the final scores achieved on each axis and any remaining critical feedback (especially fact-checking flags).

## Final Review Assistance (Phase 4)

When the user reviews the `polished-draft.md` and the `final-evaluation-report.md`:

1.  **Understanding Scores:** The scores provide a quick overview of the AI's self-assessed quality across different dimensions.
2.  **Targeted Manual Invocation:** The user can still manually invoke specific personas if they disagree with a score or want a deeper dive into a specific aspect (e.g., "Act as Atlas and justify the Structure Score of 8/10.").
3.  **Focusing Human Effort:** The report helps the user focus their final review and fact-checking efforts on areas the AI identified as potentially weaker or flagged for verification.

## Customization & Considerations

*   **Scoring Rubrics:** Defining clear criteria for each score (e.g., what constitutes a 5 vs. an 8 in Clarity) is crucial for consistent evaluation.
*   **Axis Weighting:** The system might prioritize improving certain axes over others (e.g., Clarity might be deemed more critical than Personality for some article types).
*   **Persona Selection:** For different article types, different axes (and their corresponding personas) might be evaluated.
*   **Thresholds:** Defining the target scores or stabilization criteria for ending the automated loop is important.
*   **Tooling:** This rating-based competitive review and targeted improvement requires sophisticated orchestration/scripting to manage the persona invocations, score processing, and generation of targeted revision prompts. 