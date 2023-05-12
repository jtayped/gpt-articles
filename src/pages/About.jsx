// React Util
import React from "react";

// Constants
import { general, aboutDeveloper, intro, features, tech, conclusion } from "../constants/about";

const About = () => {
  return (
    <main className="w-full flex justify-center text-white">
      <article className="flex flex-col p-4 gap-4 text-base md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl md:py-6 lg:px-0 m-auto">
        <header>
          <h1 className="text-5xl font-bold">{general.title}</h1>
          <p>{general.text}</p>
        </header>
        <section>
          <h2 className="text-2xl font-bold">{aboutDeveloper.title}</h2>
          <p>{aboutDeveloper.text}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold">{features.title}</h2>
          <p>{intro.text}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold">{features.title}</h2>
          <p>{features.text}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold">{tech.title}</h2>
          <p>{tech.text}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold">{conclusion.title}</h2>
          <p>{conclusion.text}</p>
        </section>
      </article>
    </main>
  );
};

export default About;
