import React from 'react';
import { motion } from 'framer-motion';

const HeroGradient = () => {
    return (
        <section className="hero-gradient" id="home">
            <div className="gradient-bg">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <div className="glass-container">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Limitless<br />Possibilities
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Engineering the backend of tomorrow, today.
                </motion.p>
            </div>

            <style>{`
            .hero-gradient {
                min-height: 100vh;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                background: #000;
            }

            .gradient-bg {
                position: absolute;
                inset: 0;
                filter: blur(80px);
                z-index: 0;
            }

            .blob {
                position: absolute;
                border-radius: 50%;
                animation: float 10s infinite ease-in-out;
                opacity: 0.6;
            }

            .blob-1 {
                width: 500px;
                height: 500px;
                background: #4f46e5;
                top: -100px;
                left: -100px;
                animation-delay: 0s;
            }

            .blob-2 {
                width: 400px;
                height: 400px;
                background: #ec4899;
                bottom: -50px;
                right: -50px;
                animation-delay: -2s;
            }

            .blob-3 {
                width: 600px;
                height: 600px;
                background: #06b6d4;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation-delay: -5s;
            }

            @keyframes float {
                0%, 100% { transform: translate(0, 0) scale(1); }
                33% { transform: translate(30px, -50px) scale(1.1); }
                66% { transform: translate(-20px, 20px) scale(0.9); }
            }

            .glass-container {
                z-index: 10;
                text-align: center;
                padding: 4rem;
                background: rgba(255, 255, 255, 0.05);
                backdrop-filter: blur(20px);
                border-radius: 24px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                max-width: 800px;
                width: 90%;
            }

            .glass-container h1 {
                font-size: clamp(3rem, 8vw, 6rem);
                font-weight: 800;
                line-height: 1;
                margin-bottom: 1rem;
                background: linear-gradient(to bottom, #fff, #ccc);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .glass-container p {
                font-size: 1.5rem;
                color: rgba(255, 255, 255, 0.8);
            }
        `}</style>
        </section>
    );
};

export default HeroGradient;
