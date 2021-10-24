export const Content = ({ children }) => <div>{children}</div>;

Content.Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);
