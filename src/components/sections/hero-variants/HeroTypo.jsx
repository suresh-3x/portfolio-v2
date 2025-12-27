import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroTypo = () => {
    return (
        <section className="hero-typo" id="home">
            <div className="typo-container">
                <div className="marquee">
                    <div className="track">
                        <span>BACKEND ENGINEER &nbsp; SYSTEM ARCHITECT &nbsp; POLYMATH &nbsp;</span>
                        <span>BACKEND ENGINEER &nbsp; SYSTEM ARCHITECT &nbsp; POLYMATH &nbsp;</span>
                    </div>
                </div>

                <div className="central-content">
                    <h1 className="outline-text">SURESH</h1>
                    <h1 className="filled-text">BHANDARI</h1>
                    <p>10+ YEARS OF EXCELLENCE</p>
                </div>

                <div className="marquee reverse">
                    <div className="track">
                        <span>HIGH SCALE &nbsp; DISTRIBUTED &nbsp; ROBUST &nbsp; SECURE &nbsp;</span>
                        <span>HIGH SCALE &nbsp; DISTRIBUTED &nbsp; ROBUST &nbsp; SECURE &nbsp;</span>
                    </div>
                </div>
            </div>

            <style>{`
            .hero-typo {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                overflow: hidden;
                background: #e0e0e0;
                color: #111;
            }

            .typo-container {
                display: flex;
                flex-direction: column;
                gap: 4rem;
            }

            .central-content {
                text-align: center;
                z-index: 10;
                mix-blend-mode: exclusion;
            }

            .central-content h1 {
                font-size: clamp(4rem, 15vw, 12rem);
                line-height: 0.8;
                font-weight: 900;
                margin: 0;
                letter-spacing: -5px;
            }

            .outline-text {
                -webkit-text-stroke: 2px white;
                color: transparent;
            }

            .filled-text {
                color: white;
            }

            .central-content p {
                font-family: var(--font-mono);
                font-size: 1.2rem;
                font-weight: bold;
                letter-spacing: 5px;
                margin-top: 1rem;
                color: white;
            }

            /* Marquee Animation */
            .marquee {
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                position: relative;
            }

            .track {
                display: inline-block;
                animation: marquee 20s linear infinite;
            }

            .marquee span {
                font-size: 5rem;
                font-weight: 900;
                color: rgba(0,0,0,0.05);
                text-transform: uppercase;
            }

            .reverse .track {
                animation-direction: reverse;
            }

            @keyframes marquee {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
            }
        `}</style>
        </section>
    );
};

export default HeroTypo;
