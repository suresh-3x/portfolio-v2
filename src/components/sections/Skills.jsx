import React from 'react';
import { motion } from 'framer-motion';
import {
  Server, Cpu, Cloud, Globe, Eye, Smartphone, Terminal, Layers,
  Database, Code, Box, Network, AppWindow, Brain, Hash,
  FileJson, Shield, Zap, Layout, Monitor, Workflow, Command,
  GitBranch, Container, HardDrive, Share2
} from 'lucide-react';
import Card from '../ui/Card';
import { useTheme } from '../../context/ThemeContext';

const Skills = () => {
  const { theme } = useTheme();

  // Helper to get icon for specific skills
  const getSkillIcon = (skill) => {
    const s = skill.toLowerCase();

    // Backend / Languages
    if (s.includes('python') || s.includes('golang') || s.includes('java') || s.includes('node')) return <Code size={12} />;
    if (s.includes('django') || s.includes('fastapi') || s.includes('express')) return <Server size={12} />;

    // Databases
    if (s.includes('sql') || s.includes('mongo') || s.includes('redis')) return <Database size={12} />;

    // AI / ML
    if (s.includes('torch') || s.includes('tensor') || s.includes('learn') || s.includes('pandas')) return <Brain size={12} />;
    if (s.includes('llm') || s.includes('gpt') || s.includes('agent')) return <Zap size={12} />;

    // DevOps
    if (s.includes('docker') || s.includes('kubernetes') || s.includes('container')) return <Box size={12} />;
    if (s.includes('aws') || s.includes('gcp') || s.includes('azure') || s.includes('terraform')) return <Cloud size={12} />;
    if (s.includes('ci/cd') || s.includes('grafana')) return <Workflow size={12} />;

    // Frontend
    if (s.includes('react') || s.includes('next') || s.includes('vue') || s.includes('svelte')) return <AppWindow size={12} />;
    if (s.includes('css') || s.includes('tailwind') || s.includes('style')) return <Layout size={12} />;
    if (s.includes('typescript') || s.includes('javascript')) return <FileJson size={12} />;
    if (s.includes('redux') || s.includes('graphql')) return <Share2 size={12} />;

    // Networking
    if (s.includes('tcp') || s.includes('dns') || s.includes('socket') || s.includes('grpc')) return <Network size={12} />;
    if (s.includes('nginx') || s.includes('load bal')) return <Server size={12} />;

    // CV
    if (s.includes('vision') || s.includes('opencv') || s.includes('yolo') || s.includes('image')) return <Eye size={12} />;

    // Mobile
    if (s.includes('mobile') || s.includes('android') || s.includes('ios') || s.includes('swift')) return <Smartphone size={12} />;

    // System
    if (s.includes('bash') || s.includes('shell') || s.includes('cron')) return <Terminal size={12} />;
    if (s.includes('security')) return <Shield size={12} />;
    if (s.includes('process')) return <Cpu size={12} />;

    return <Hash size={12} />;
  };

  // Need to add Share2 to imports if used, but for now fallback to Hash if I missed one
  // correcting the Share2 usage below to just use GitBranch or similar

  const skillCategories = [
    {
      title: "Backend Engineering",
      icon: <Server size={18} />,
      color: "#3fb950", // Green (RGB Primary)
      skills: ["Python", "Golang", "Django", "FastAPI", "Express.js", "PostgreSQL", "MongoDB", "Redis", "RabbitMQ"]
    },
    {
      title: "Fullstack Dev",
      icon: <Layers size={18} />,
      color: "#3f52fd", // Blue (RGB Secondary)
      skills: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind", "GraphQL", "Redux"]
    },
    {
      title: "AI & ML",
      icon: <Cpu size={18} />,
      color: "#ff4b4b", // Red (RGB Tertiary)
      skills: ["PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "LLMs", "LangChain", "AI Agents"]
    },
    {
      title: "DevOps & Cloud",
      icon: <Cloud size={18} />,
      color: "#3fb950", // Green (RGB Primary)
      skills: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "CI/CD", "Grafana"]
    },
    {
      title: "System Networking",
      icon: <Globe size={18} />,
      color: "#3f52fd", // Blue (RGB Secondary)
      skills: ["TCP/IP", "DNS", "WebSockets", "gRPC", "Nginx", "Load Balancing"]
    },
    {
      title: "Computer Vision",
      icon: <Eye size={18} />,
      color: "#ff4b4b", // Red (RGB Tertiary)
      skills: ["OpenCV", "YOLO", "Image Processing", "Object Detection", "Video Analytics"]
    },
    {
      title: "Mobile Dev",
      icon: <Smartphone size={18} />,
      color: "#3fb950", // Green (RGB Primary)
      skills: ["React Native", "SwiftUI", "Android", "Mobile Web", "Expo"]
    },
    {
      title: "Systems & Linux",
      icon: <Terminal size={18} />,
      color: "#3f52fd", // Blue (RGB Secondary)
      skills: ["Bash", "Shell", "Process Mgmt", "Cron Jobs", "Security Hardening"]
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="hash">#</span> System Modules
        </h2>
        <p className="section-subtitle">
          Core technical components and deployment stack.
        </p>
      </div>

      <div className="skills-compact-grid">
        {skillCategories.map((category, idx) => {
          const isMonochrome = theme === 'monochrome';
          const isRGB = theme === 'rgb';

          const RGB_COLORS = ['#3fb950', '#3f52fd', '#ff4b4b']; // Green, Blue, Red

          const accentColor = isMonochrome
            ? '#ffffff'
            : (isRGB
              ? RGB_COLORS[idx % 3]
              : category.color);

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card
                className="module-card"
                showStrip={true}
                noPadding={true}
                style={{
                  '--accent-primary': accentColor,
                  borderRadius: '4px'
                }}
              >
                <div className="module-inner">
                  <div className="module-header" style={{ borderBottomColor: isMonochrome ? 'var(--border-color)' : `${accentColor}20` }}>
                    <div className="module-icon-box" style={{ color: accentColor }}>{category.icon}</div>
                    <h3 className="module-title">{category.title}</h3>
                  </div>
                  <div className="module-tags">
                    {category.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="module-tag" style={{ '--hover-color': accentColor }}>
                        <span className="skill-icon-small" style={{ opacity: 0.7 }}>
                          {getSkillIcon(skill)}
                        </span>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        .skills-section {
          padding: 6rem 0;
        }

        .skills-compact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .module-card {
          height: 100%;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.01);
          transition: all 0.3s ease;
        }

        .module-card:hover {
            border-color: var(--accent-primary);
            background: rgba(var(--accent-primary-rgb), 0.02);
        }

        .module-inner {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .module-header {
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .module-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          margin-right: 4px;
        }

        .module-icon-box svg {
          width: 20px;
          height: 20px;
        }

        .module-title {
          font-size: 0.9rem;
          font-weight: 800;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: var(--font-mono);
          margin: 0;
        }

        .module-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .module-tag {
          font-size: 0.75rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.02);
          padding: 4px 10px;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          font-family: var(--font-mono);
          transition: all 0.2s ease;
          cursor: default;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .skill-icon-small {
            display: flex;
            align-items: center;
        }

        .module-tag:hover {
          border-color: var(--hover-color);
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-1px);
        }
        
        .module-tag:hover .skill-icon-small {
            opacity: 1 !important;
            color: var(--hover-color);
        }

        @media (max-width: 768px) {
          .skills-section {
            padding: 4rem 1rem;
          }
          .skills-compact-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .module-inner {
            padding: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
