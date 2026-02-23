export const portfolio = {
    name: "Gaon Sun",
    title: "Software Developer & UI/UX Designer",
    intro: "Hello, I am —",
    description: "Beyond simple coding, I design <em>accessible and pixel-perfect digital experiences</em>. I balance user experience and robust code at the intersection of design and engineering.",
    social: {
        email: "mailto:wps.gaon@gmail.com",
        linkedin: "https://www.linkedin.com/in/gaon-sun-305128262/",
        github: "https://github.com/mnigaon",
        resume: "/resume.pdf"
    },
    projects: [
        {
            num: "01",
            title: "Dayzzy",
            description: "An all-in-one schedule management web app designed to streamline your daily tasks and calendar events. Features intuitive drag-and-drop organization and real-time synchronization.",
            tags: ["React", "JavaScript", "Firebase", "Context API", "Google APIs"],
            links: [
                { label: "GitHub ↗", href: "https://github.com/mnigaon/Dayzzy" },
                { label: "Live Demo ↗", href: "https://tasky-d81f5.web.app/" },
            ],
            image: "/dayzzy.jpg"
        },
        {
            num: "02",
            title: "CineVault",
            description: "Personalized movie search and archiving platform. Users can discover movies, save favorites, and manage their watchlists with seamless Google & Email authentication.",
            tags: ["React", "TypeScript", "Tailwind CSS", "TMDB API", "Firebase", "Framer Motion"],
            links: [
                { label: "GitHub ↗", href: "https://github.com/mnigaon/CineVault" },
                { label: "Live Demo ↗", href: "https://cine-vault-alpha.vercel.app" },
            ],
            image: "/cinevault.jpg"
        },
        {
            num: "03",
            title: "ReciiPick",
            description: "AI-powered recipe recommendation engine. Inputs ingredients or preferences to generate personalized recipes instantly using advanced LLM integration.",
            tags: ["React", "JavaScript", "OpenAI API", "Vercel"],
            links: [
                { label: "GitHub ↗", href: "https://github.com/mnigaon/ReciiPick" },
                { label: "Live Demo ↗", href: "https://recii-pick.vercel.app" },
            ],
            image: "/reciipick.jpg"
        },
        {
            num: "04",
            title: "WeatherFit",
            description: "Weather-based outfit & activity recommendations. Delivers smart, real-time suggestions tailored to current weather conditions to help users dress and plan their day perfectly.",
            tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "OpenWeather API", "Vercel"],
            links: [
                { label: "GitHub ↗", href: "https://github.com/mnigaon/WeatherFit" },
                { label: "Live Demo ↗", href: "https://weather-fit-eta.vercel.app" },
            ],
            image: "/weatherfit.jpg"
        },
    ],
    skills: {
        languages: [
            "JavaScript",
            "TypeScript",
        ],
        frameworks: [
            "React",
            "Next.js",
            "Tailwind CSS",
        ],
        cloud: [
            "Firebase (Auth, Firestore, Storage)",
            "Vercel",
        ],
        design: [
            "Figma",
            "Canva",
            "Adobe XD",
        ],
        ai: [
            "OpenAI API",
            "OpenWeather API",
            "TMDB API",
            "Google APIs",
            "REST API Integration",
        ],
        tools: [
            "Git / GitHub",
            "VS Code",
        ],
    },
    experiences: [],
    education: [
        {
            school: "SAIT - Southern Alberta Institute of Technology",
            degree: "Software Development",
            period: "Graduation: Feb 2025",
            location: "Calgary, AB",
            link: "https://www.sait.ca/",
            image: "/sait.jpg"
        }
    ]
};
