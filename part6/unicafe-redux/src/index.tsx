import { createStore } from "@reduxjs/toolkit";
import ReactDOM from "react-dom";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { counterSlice } from "./counterSlice";

const store = createStore(counterSlice.reducer);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const App = () => {
  const dispatch = useAppDispatch();
  const good = useAppSelector((state) => state.good);
  const ok = useAppSelector((state) => state.ok);
  const bad = useAppSelector((state) => state.bad);

  const onGood = () => dispatch(counterSlice.actions.good());
  const onOk = () => dispatch(counterSlice.actions.ok());
  const onBad = () => dispatch(counterSlice.actions.bad());
  const onReset = () => dispatch(counterSlice.actions.reset());

  return (
    <div>
      <button onClick={onGood}>good</button>
      <button onClick={onOk}>ok</button>
      <button onClick={onBad}>bad</button>
      <button onClick={onReset}>reset stats</button>
      <div>good: {good}</div>
      <div>ok: {ok}</div>
      <div>bad: {bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};

renderApp();
store.subscribe(renderApp);
