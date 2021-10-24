export const Content = ({ parts }) => (
  <div>
    <Part {...parts[0]} />
    <Part {...parts[1]} />
    <Part {...parts[2]} />
  </div>
);

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);
