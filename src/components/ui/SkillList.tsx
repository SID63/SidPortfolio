import { skillCategories } from '../../data/skills';

export default function SkillList() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {skillCategories.map((category, index) => (
        <div key={index}>
          <h4 className="font-medium mb-2">{category.title}</h4>
          <ul className="space-y-2">
            {category.skills.map((skill, skillIndex) => (
              <li key={skillIndex}>{skill}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}