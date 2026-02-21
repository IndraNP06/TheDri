import { Hero } from '../components/Hero';
import { Skills, Projects, Contact, About, Experience } from '../components/Sections';

export function Home() {
    return (
        <div>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
        </div>
    );
}
