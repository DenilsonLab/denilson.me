import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[], offset = 200) {
    const [activeSection, setActiveSection] = useState(sectionIds[0]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + offset;

            for (const sectionId of sectionIds) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sectionIds, offset]);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setActiveSection(sectionId);
        }
    };

    return { activeSection, scrollToSection };
}
