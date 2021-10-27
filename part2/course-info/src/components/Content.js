export const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} {...part}></Part>
    ))}
  </div>
);

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);
