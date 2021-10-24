export const Content = ({ children }) => <div>{children}</div>;

Content.Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);
