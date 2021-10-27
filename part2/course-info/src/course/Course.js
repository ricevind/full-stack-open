import { Header, Part, Total } from "../components";

export const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <div>
        {course.parts.map((part) => (
          <Part key={part.id} {...part}></Part>
        ))}
      </div>
      <Total parts={course.parts} />
    </div>
  );
};
