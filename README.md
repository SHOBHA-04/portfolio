# Shobha Bharti – Portfolio Website

A personal portfolio built with plain HTML, CSS and JavaScript. No build step, no libraries, no server. It works on GitHub Pages as it is.

## Folder structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   ├── favicon.svg
│   │   ├── profile.jpg
│   │   ├── weather-monitoring.svg
│   │   └── plant-disease-detection.svg
│   └── documents/
│       └── resume.pdf
└── README.md
```

File and folder names are lowercase. GitHub Pages is case-sensitive, so keep them exactly like this.

## 1. Open the site on your computer

**Easy way:** double-click `index.html`. It opens in your browser.

**Local server (optional):** open a terminal in this folder and run

```
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## 2. Publish on GitHub Pages

1. Sign in to GitHub and click **New repository**.
2. Give it a name (for example `portfolio`). Keep it **Public**. Click **Create repository**.
3. On the new repository page, click **uploading an existing file**.
4. Open the unzipped `portfolio` folder, select **everything inside it** (`index.html`, `css`, `js`, `assets`, `README.md`) and drag it into the browser. `index.html` must be at the top level of the repository, not inside another folder.
5. Click **Commit changes**.
6. Go to **Settings → Pages**.
7. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
8. Choose branch **main** and folder **/ (root)**, then click **Save**.
9. Wait one or two minutes. Your site will be at
   `https://shobha-04.github.io/portfolio/` (replace `portfolio` with your repository name).

Tip: if you name the repository `shobha-04.github.io`, the site is available at `https://shobha-04.github.io/` with no repository name.

To update the site later, upload the changed files again to the same repository (or edit them on GitHub with the pencil icon) and commit.

## 3. Where to edit each part

Open `index.html` in any text editor (VS Code is fine). Every piece of content you may want to change has a comment above it that starts with `EDIT:` or `REPLACE:`. Use Find (`Ctrl+F`) to search for those words.

| What | Where in `index.html` |
|---|---|
| Page title, description, link preview | top of the file, inside `<head>` |
| Name, headline, location, intro | section `id="home"` |
| About paragraphs | section `id="about"` |
| Education | section `id="education"` |
| Skills | section `id="skills"` |
| Projects | section `id="projects"` |
| Internship and training | section `id="training"` |
| Certifications | section `id="certifications"` |
| Email, LinkedIn, GitHub, location | section `id="contact"` |
| Footer text | `<footer>` near the bottom |

**Colors:** open `css/style.css`. All colors are at the top, in one block for the light theme (`:root`) and one for the dark theme (`:root[data-theme="dark"]`). Change a color there and it updates everywhere.

## 4. How to add things

Each repeated item sits between `COPY THIS BLOCK` and `END BLOCK` comments. Copy the whole block, paste it right after the last one, and change the text.

### Add a project
1. In the Projects section, copy one full `<article class="card project-card ...">` block.
2. Paste it after the last project.
3. Change the title, description, tags and contribution list.
4. Put a new image in `assets/images/` and change the `src` and `alt` of the `<img>`.

### Add a certificate
1. In the Certifications section, copy one `<article class="card hover reveal">` block.
2. Paste it after the last one.
3. Change the year (badge), name and institute.

### Add project links ("View Code" and "Live Demo")
Each project has two buttons with an empty `href=""`. Empty buttons are hidden automatically. To show one, paste the URL between the quotes:

```html
<a class="btn btn-outline btn-sm" href="https://github.com/SHOBHA-04/your-repo" data-optional target="_blank" rel="noopener noreferrer">View Code</a>
```

Keep `data-optional` on the link. It is what hides the button when the URL is empty.

### Show your phone number (optional)
The phone number is **not** shown. To show it, find the commented phone block in the Contact section, remove the comment markers and replace `YOUR-PHONE-NUMBER`.

### Change your profile photo
Replace `assets/images/profile.jpg` with a new square photo (about 600 × 600 px, same file name).

### Change your resume
Replace `assets/documents/resume.pdf` with a new PDF (same file name). Note: anything inside the PDF, including contact details, is public once the site is published.

## 5. Checklist – optional things you can still add

- [ ] Your own project images (replace the two SVG illustrations)
- [ ] Project links: View Code and Live Demo for both projects (buttons stay hidden until added)
- [ ] After publishing, open the live site and test every link on your phone
