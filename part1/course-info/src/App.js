import { Total, Header, Content } from "./components";

export const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header title={course} />
      <Content>
        <Content.Part part={part1} exercises={exercises1} />
        <Content.Part part={part2} exercises={exercises2} />
        <Content.Part part={part3} exercises={exercises3} />
      </Content>
      <Total value={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
