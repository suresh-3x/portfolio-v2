import React from 'react';
import { motion } from 'framer-motion';
import { Server, Cpu, Code, Cloud, Globe, Eye, Smartphone, Terminal, Layers } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Fullstack Development",
      icon: <Layers size={24} />,
      skills: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "GraphQL", "Redux"]
    },
    {
      title: "Backend Engineering",
      icon: <Server size={24} />,
      skills: ["Python", "Golang", "Django", "FastAPI", "Express.js", "PostgreSQL", "MongoDB", "Redis", "RabbitMQ"]
    },
    {
      title: "AI & Machine Learning",
      icon: <Cpu size={24} />,
      skills: ["PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "LLMs", "LangChain", "AI Agents"]
    },
    {
      title: "DevOps & Cloud",
      icon: <Cloud size={24} />,
      skills: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "CI/CD", "Prometheus", "Grafana"]
    },
    {
      title: "Networking",
      icon: <Globe size={24} />,
      skills: ["TCP/IP", "DNS", "HTTP/HTTPS", "WebSockets", "gRPC", "Load Balancing", "Nginx"]
    },
    {
      title: "Computer Vision",
      icon: <Eye size={24} />,
      skills: ["OpenCV", "YOLO", "Image Processing", "Object Detection", "Face Recognition", "Video Analytics"]
    },
    {
      title: "Mobile App Dev",
      icon: <Smartphone size={24} />,
      skills: ["React Native", "SwiftUI", "iOS", "Android", "Mobile Web", "Expo"]
    },
    {
      title: "Linux & Systems",
      icon: <Terminal size={24} />,
      skills: ["Bash Scripting", "Shell", "System Admin", "OS Internals", "Process Management", "Cron Jobs"]
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="hash">#</span> System Modules
        </h2>
        <p className="section-subtitle">
          Technologies and tools I use to build resilient systems.
        </p>
      </div>

      <div className="skills-grid">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="skill-category"
          >
            <h3 className="category-title">{category.title}</h3>
            <div className="skill-tags">
              {category.skills.map((skill, sIdx) => (
                <span key={sIdx} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .skills-section {
          padding: var(--spacing-xl) 0;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-lg);
        }

        .skill-category {
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          padding: var(--spacing-lg);
          border-radius: 8px;
          position: relative;
          overflow: hidden;
        }

        .skill-category::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-secondary), transparent);
          opacity: 0.5;
        }

        .category-title {
          font-size: 1rem;
          color: var(--text-primary);
          margin-bottom: var(--spacing-md);
          font-family: var(--font-mono);
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-sm);
        }

        .skill-tag {
          font-size: 0.85rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.05);
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid transparent;
          transition: all var(--transition-fast);
          cursor: default;
        }

        .skill-tag:hover {
          border-color: var(--accent-secondary);
          color: var(--accent-secondary);
          background: rgba(0, 240, 255, 0.05);
        }
      `}</style>
    </section>
  );
};

export default Skills;
