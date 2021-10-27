export const Total = ({ parts }) => (
  <p>
    Number of exercises{" "}
    {parts.reduce((total, { exercises }) => total + exercises, 0)}
  </p>
);
