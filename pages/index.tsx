import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hi there</h1>
          <p className="py-6">There is nothing to see here.</p>
          <a className="btn btn-primary" href="https://podnoms.com">
            What next??
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
