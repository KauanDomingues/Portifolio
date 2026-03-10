const glow = document.getElementById('mouse-glow');
const overGlow = document.getElementById('over-mouse-glow')
const pointer = document.getElementById("pointer");

//Glow follows mouse ponter
document.addEventListener('mousemove', (e) => {
    glow.style.top = `${e.clientY}px`;
    glow.style.left = `${e.clientX}px`;
    overGlow.style.top = `${e.clientY}px`;
    overGlow.style.left = `${e.clientX}px`;
    pointer.style.top = `${e.clientY}px`;
    pointer.style.left = `${e.clientX}px`;
    pointer.style.transform = `rotate(${e.spee}deg)`
});

//Able/Unable glow if mouse enter or leave window
document.addEventListener('mouseenter', () => {
    glow.style.visibility = 'visible';
    overGlow.style.visibility = "visible";
    pointer.style.visibility = "visible";
})
document.addEventListener('mouseleave', () => {
    glow.style.visibility = "hidden";
    overGlow.style.visibility = "hidden";
    pointer.style.visibility = "hidden";
})

//theme controller
document.getElementById("themeButton").onclick = () => {
    document.body.classList.toggle("light-mode");
    const theme = document.body.classList.contains("light-mode") ? "light-mode" : "dark-mode";
    localStorage.setItem("theme", theme)
    document.getElementById("theme-button").classList.toggle("rotated");
};

// build html string with project card structure
function buildProjectCard(imgPath, projName, projDescription, projTags, projLinks) {
    let tagsStructure = ""
    for (let tag of projTags) { tagsStructure += `<li>${tag}</li>` }

    let linksStructure = ""
    for (let [key, value] of Object.entries(projLinks)) {
        linksStructure += `<a href=${value} target="_blank">${key}</a>`
    }

    return `<div class="project-card">
            <div class="card-img" style="background-image: url(${imgPath});"></div>
            <div style="margin: 25px;">
                <h3>${projName}</h3>
                <div style="margin: 0 15px;">
                    <p>${projDescription}</p>
                    <ul class="tags">
                        ${tagsStructure}
                    </ul>
                    <div class="links">
                       ${linksStructure}
                    </div>
                </div>
            </div>
        </div>`
}

function buildCertificationCard(name, path) {
    return `
        <div class="certification-preview" style="background-image: url(${path});"></div>
        <p>${name}</p>`
}


document.addEventListener('DOMContentLoaded', () => {

    const theme = localStorage.getItem("theme");
    if (theme === "dark-mode") {
        document.body.classList.remove("light-mode");
        document.getElementById("theme-button").classList.remove("rotated");
    } else {
        document.body.classList.add("light-mode");
        document.getElementById("theme-button").classList.add("rotated");
    }

    const kdHeaderText = document.getElementById('kdHeaderText');

    const abtmeButton = document.getElementById('about-me-button');
    const techStackButton = document.getElementById('tech-stack-button');
    const projectsButton = document.getElementById('projects-button');
    const educationButton = document.getElementById('education-button');

    const presentationBottomDivider = document.getElementById('presentation-bottom-divider');
    const abtmeBottomDivider = document.getElementById('about-me-bottom-divider');
    const techStackBottomDivider = document.getElementById('tech-stack-bottom-divider');
    const projectsBottomDivider = document.getElementById('projects-bottom-divider');
    const educationBottomDivider = document.getElementById('education-bottom-divider');


    //Read projects.json and add card to html
    fetch("./src/json/projects.json").then(res => res.json().then(data => {
        data.projects.forEach(project => {
            let card = buildProjectCard(project.imgPath, project.name, project.description, project.tags, project.links);
            document.getElementById("projects-cards-section").innerHTML += card;
        });
    }))

    //remove the color from all the header buttons
    function unfocusAll() {
        for (let item of [kdHeaderText, abtmeButton, techStackButton, projectsButton, educationButton]) {
            item.classList.remove('active');
        }
    }

    //activate (add color) to the button based on the section scroll
    document.addEventListener('scroll', () => {
        let currentWindowCenter = window.innerHeight / 2;

        unfocusAll()
        if (currentWindowCenter <= presentationBottomDivider.getBoundingClientRect().top) {
            kdHeaderText.classList.add('active');
        } else if (currentWindowCenter <= abtmeBottomDivider.getBoundingClientRect().top) {
            abtmeButton.classList.add('active');
        } else if (currentWindowCenter <= techStackBottomDivider.getBoundingClientRect().top) {
            techStackButton.classList.add('active');
        } else if (currentWindowCenter <= projectsBottomDivider.getBoundingClientRect().top) {
            projectsButton.classList.add('active');
        } else if (currentWindowCenter <= educationBottomDivider.getBoundingClientRect().top) {
            educationButton.classList.add('active');
        }
    })

    //nav buttons
    let coords = new Map([
        [kdHeaderText, "presentation"],
        [abtmeButton, "about-me"],
        [techStackButton, "tech-stack"],
        [projectsButton, "projects"],
        [educationButton, "education"]
    ])

    //scroll to section
    for (let [button, section] of coords) {
        button.onclick = () => {
            document.getElementById(section).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }

    //nav bar
    const navBarButton = document.getElementById('menu-selection');
    const navList = document.getElementById('nav-list')

    //Open nav-list and enable the listener to close it
    navBarButton.onclick = () => {
        navList.style.display = "flex";
        setTimeout(() => {
            window.addEventListener('click', (e) => {
                if (e.target !== navList) {
                    navList.style.display = "none";
                }
            }, { once: true })
        }, 100)
    }

    //Certifications 
    let displayCertification = document.getElementById("display-certification");
    let certificationView = document.getElementById("certification-view");
    let title = document.getElementById("certification-title");

    fetch("./src/json/certifications_paths.json").then(res => res.json().then(data => {
        data.certifications.forEach(certification => {
            let card = document.createElement('div');
            card.className = 'certification-card';
            card.innerHTML += buildCertificationCard(certification.name, certification.path);
            document.getElementById("certifications").appendChild(card);

            card.addEventListener('click', (e) => {
                e.stopPropagation();
                displayCertification.style.display = "flex";
                certificationView.src = certification.path;
                title.textContent = certification.name;
            })


        });
    }))

    window.addEventListener("click", (e) => {
        if (!certificationView.contains(e.target)) {
            displayCertification.style.display = "none";
        }
    });
});

