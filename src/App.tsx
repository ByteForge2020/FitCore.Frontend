import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { useAppDispatch, useAppSelector } from './store/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
  setCount,
} from './store/slices/counterSlice';
import { usePosts } from './hooks/useExampleQuery';

export default function App() {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  const { data: posts, isLoading, error } = usePosts();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React (TypeScript)</h1>

      <div className="card">
        <h2>Redux Counter Example</h2>
        <p>
          Current count: <strong>{count}</strong>
        </p>
        <div
          style={{
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <button onClick={() => dispatch(increment())}>Increment</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
          <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
          <button onClick={() => dispatch(setCount(10))}>Set to 10</button>
          <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
      </div>

      <div className="card">
        <h2>React Query Example (Posts from external host)</h2>
        {isLoading && <p>Loading posts...</p>}
        {error && <p>Error: {error.message}</p>}
        {posts && (
          <div>
            <p>
              Total posts: <strong>{posts.length}</strong>
            </p>
            <div style={{ maxHeight: 200, overflowY: 'auto', textAlign: 'left' }}>
              {posts.slice(0, 5).map((post) => (
                <div
                  key={post.id}
                  style={{
                    marginBottom: 10,
                    padding: 10,
                    border: '1px solid #ccc',
                    borderRadius: 4,
                  }}
                >
                  <strong>{post.title}</strong>
                  <p style={{ fontSize: '0.9em', color: '#666' }}>
                    {post.body.substring(0, 100)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

