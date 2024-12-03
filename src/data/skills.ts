interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Development",
    skills: ["React / Three.js", "TypeScript", "WebGL", "Node.js"]
  },
  {
    title: "3D & Design",
    skills: ["3D Modeling", "Animation", "UI/UX Design", "Shader Programming"]
  }
];