//https://codesandbox.io/embed/pd46s

// import { useState } from "react";
import { atom, useAtom } from "jotai";

const countAtom = atom(0);
// const count2Atom = countAtom;

const Counter1 = () => {
  const [count, setCount] = useAtom(countAtom);
  return (
    <div>
      {count}
      <button
        onClick={() => setCount((c) => c + 1)}
      >
        +1
      </button>
    </div>
  );
};

const Counter2 = () => {
  const [count, setCount] = useAtom(countAtom);
  return (
    <div>
      {count}
      <button
        onClick={() => setCount((c) => c + 1)}
      >
        +1
      </button>
    </div>
  );
};

const Counter3 = () => {
  const [count, setCount] = useAtom(countAtom);
  return (
    <div>
      {count}
      <button
        onClick={() => setCount((c) => c + 1)}
      >
        +1
      </button>
    </div>
  );
};

const Boop = () => (
  <>
    <Counter1 />
    <Counter2 />
    <Counter3 />
  </>
);

export default Boop;
