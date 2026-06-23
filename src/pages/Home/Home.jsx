import React from 'react';
import './Home.css';

function Home() {
    return (
        <>
            <section className="home">
                <h1 className="home-title">Web</h1>
                <h1 id="portfolio">Portfolio</h1>
                <h1 className="home-title">Developer</h1>
            </section>

            <section className="scroll-indicator">
                <div className="scroll-indicator__line"></div>
                {/* <div id="scroll-indicator__fill" className="scroll-indicator__fill"></div> */}
                <div className="scroll-indicator__line"></div>
                <div className="scroll-indicator__line"></div>
                <div className="scroll-indicator__line"></div>
            </section>
        </>
    );
}

export default Home; 