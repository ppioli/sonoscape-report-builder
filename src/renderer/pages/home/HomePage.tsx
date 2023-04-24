import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Medical History App</h1>
      <p className="text-lg mb-16">
        Keep track of your medical history, appointments, and medications all in
        one place.
      </p>
      <div className="flex gap-4">
        <Link to="/history">
          <button type="button" className="btn">
            Something
          </button>
        </Link>
        <Link to="/appointments">
          <button type="button" className="btn">
            Something
          </button>
        </Link>
        <Link to="/medications">
          <button type="button" className="btn">
            Something
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
