export const portfolio = {
    name: "Gaon Sun",
    title: "but you can call me <span class='text-white'>Jenny</span>",
    intro: "Hello, I am —",
    description: "Beyond simple coding, I design <em>accessible and pixel-perfect digital experiences</em>. I balance user experience and robust code at the intersection of design and engineering.",
    social: {
        email: "mailto:wps.gaon@gmail.com",
        linkedin: "https://www.linkedin.com/in/gaon-sun-305128262/",
        github: "https://github.com/mnigaon",
        instagram: "https://www.instagram.com/qaonsonnee/",
        resume: "/resume.pdf"
    },
    projects: [
        {
            num: "01",
            title: "WeatherFit",
            description: "Weather-based outfit & activity recommendations. Delivers smart, real-time suggestions tailored to current weather conditions to help users dress and plan their day perfectly.",
            tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "OpenWeather API", "Vercel"],
            links: [
                { label: "GitHub ↗", href: "https://github.com/mnigaon/WeatherFit" },
                { label: "Visit Site ↗", href: "https://weather-fit-eta.vercel.app" },
            ],
            image: "/weatherfit.jpg"
        },
        {
            num: "02",
            title: "CineVault",
            description: "Personalized movie search and archiving platform. Users can discover movies, save favorites, and manage their watchlists with seamless Google & Email authentication.",
            tags: ["React", "TypeScript", "Tailwind CSS", "TMDB API", "Firebase", "Framer Motion"],
            links: [
                { label: "GitHub ↗", href: "https://github.com/mnigaon/CineVault" },
                { label: "Visit Site ↗", href: "https://cine-vault-alpha.vercel.app" },
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
                { label: "Visit Site ↗", href: "https://recii-pick.vercel.app" },
            ],
            image: "/reciipick.jpg"
        },
        {
            num: "04",
            title: "Dayzzy",
            description: "An all-in-one schedule management web app designed to streamline your daily tasks and calendar events. Features intuitive drag-and-drop organization and real-time synchronization.",
            tags: ["React", "JavaScript", "Firebase", "Context API", "Google APIs"],
            links: [
                { label: "GitHub ↗", href: "https://github.com/mnigaon/Dayzzy" },
                { label: "Visit Site ↗", href: "https://tasky-d81f5.web.app/" },
            ],
            image: "/dayzzy.jpg"
        },
        /*
        {
            num: "05",
            title: "Candid",
            description: "A professional restaurant review platform that emphasizes honest opinions and community-driven insights. Built with a robust full-stack architecture featuring secure authentication and seamless data management.",
            tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Prisma", "NextAuth", "Vercel"],
            links: [
                { label: "GitHub ↗", href: "https://github.com/mnigaon/Candid" },
                { label: "Visit Site ↗", href: "https://candid-mauve.vercel.app" },
            ],
            image: "/candid.jpg"
        },
        */
    ],
    skills: {
        frontend: [
            { name: "HTML", level: 95 },
            { name: "CSS", level: 90 },
            { name: "JavaScript", level: 85 },
            { name: "TypeScript", level: 80 },
            { name: "React", level: 85 },
            { name: "Tailwind CSS", level: 90 },
            { name: "Next.js", level: 80 },
        ],
        backend: [
            { name: "Python", level: 75 },
            { name: "Vercel", level: 85 },
            { name: "Firebase", level: 80 },
            { name: "OracleDB", level: 40 },
            { name: "MongoDB", level: 40 },
        ],
        tools: [
            { name: "Git", level: 85 },
            { name: "GitHub", level: 85 },
            { name: "VS Code", level: 95 },
            { name: "Canva", level: 80 },
            { name: "CapCut", level: 75 },
            { name: "DaVinci Resolve", level: 65 },
            { name: "Figma", level: 80 },
        ],
        currentlyWorkingOn: [
            { name: "Node.js", level: 50 },
            { name: "PostgreSQL", level: 45 },
            { name: "Java", level: 40 },
            { name: "React Native", level: 35 },
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
