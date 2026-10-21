# Paging Algorithms — interactive lesson

A self-contained HTML lesson covering paging, FIFO, LRU, Optimal replacement, page-fault rates, and Belady’s anomaly. Includes keyboard-controlled slides, a step-by-step simulator, comparison totals, and a knowledge check. No build tools, dependencies, credentials, or external assets are required.

Open `index.html` directly, or run from this directory:

```sh
python -m http.server 8000
```

Then open the served page in your browser. Use the Back/Next buttons or left/right arrow keys. In the simulator, click **Load trace** after changing inputs. The trace starts with empty frames; replacement retains frame positions. Optimal ties are resolved by choosing the first tied frame.

## Source and attribution

Visual and presentation reference: [Pedagogy of the Lean Code — Presentation.html](https://github.com/F-O-R-G-E-Open-Source-Philanthropy/axiom/blob/main/templates/Pedagogy%20of%20the%20Lean%20Code-%20Presentation.html), part of [Axiom](https://github.com/F-O-R-G-E-Open-Source-Philanthropy/axiom), revision `ba4a16019abc4ea34b50b94b287e5fec5e36587e`, by F-O-R-G-E Open Source Philanthropy contributors. Adapted on 2026-10-20 with new lesson content, offline styles, accessible navigation, and page replacement simulation. Distributed under GPL-3.0; see LICENSE.

The classroom edition includes 13 slides, five original labeled SVG diagrams with explanations, a desk-and-books analogy, a shared worked example, and expandable teacher notes. The original conversation images were unavailable; these diagrams were created for this lesson.

## Editing the lesson

All source files live in this repository. No template service or external asset host is needed to run or edit the lesson.

| File | What to edit |
| --- | --- |
| `index.html` | Slide text, explanations, teacher notes, questions, and slide order |
| `styles.css` | Colors, fonts, spacing, responsive layout, and print styles |
| `lesson.js` | Slide navigation, simulator controls, and quiz feedback |
| `paging.js` | FIFO, LRU, and Optimal simulation logic |
| `images/*.svg` | Labeled diagrams; editable as SVG text or with a vector editor |
| `tests/paging.test.js` | Checks for the examples taught in class |

To add a slide, copy a `<section class="slide" hidden>…</section>` inside `<main>` in `index.html`, then edit its content. The slide counter updates automatically. Preserve existing element IDs because the interactive controls use them. Use unique IDs for any new controls.

To add an image, place it in `images/` and reference it with a relative path, descriptive `alt` text, and an explanatory `<figcaption>`.

Run the algorithm tests with Node.js (no packages to install):

```sh
node --test tests/paging.test.js
```

## Publish with GitHub Pages

In this GitHub repository, open **Settings → Pages**, select **Deploy from a branch**, choose **main** and **/ (root)**, and save. GitHub will show the published URL when deployment finishes. Changes pushed to that branch will update the site. Publication must be enabled in repository settings; source files alone do not establish that the site is live.
