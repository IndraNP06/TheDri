import { Hero } from '../components/Hero';
import { Skills, Projects, Contact, About, Experience } from '../components/Sections';
import { TestConnection } from '../components/TestConnection';

export function Home() {
    return (
        <div>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <TestConnection />
            <Contact />
        </div>
    );
}
