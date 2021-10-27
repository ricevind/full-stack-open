import { Header, Content, Total } from "../components";

export const Course = ({ course }) => (
  <div>
    <Header title={course.name} />
    <Content parts={course.parts}></Content>
    <Total parts={course.parts} />
  </div>
);
