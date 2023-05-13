// React Markdown
import React from "react";

// JSX Elements
import { UserSideInfo } from "../../containers";

// CSS
import "./article.css";

const Aritcle = () => {
  const article = {
    title: "Artificial Intelligence",
    userID: "dcPhi0gcEmTs2u6aaAjguRxh7sD2",
    timestamp: "12 May 2023",
    cover:
      "https://images.unsplash.com/photo-1682687218147-9806132dc697?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80",
    article:
      "## Introduction Artificial Intelligence (AI) refers to the development of computer systems that can perform tasks that would typically require human intelligence. It involves the creation of intelligent machines capable of learning, reasoning, and problem-solving.  ## Applications of AI AI has found applications in various fields, including:  1. **Machine Learning**: Machine learning is a branch of AI that focuses on enabling computers to learn from data without explicit programming. It has been successfully applied in areas such as image recognition, natural language processing, and recommendation systems.  2. **Natural Language Processing**: Natural Language Processing (NLP) involves enabling computers to understand, interpret, and generate human language. It has been used in chatbots, virtual assistants, and language translation.  3. **Computer Vision**: Computer vision deals with enabling computers to see and interpret visual data, such as images and videos. It has been used in object recognition, facial recognition, and autonomous vehicles.  4. **Robotics**: AI plays a crucial role in robotics, enabling machines to perceive their environment, make decisions, and perform physical tasks. Robots are used in industries such as manufacturing, healthcare, and exploration.  5. **Data Analytics**: AI techniques, combined with large datasets, have revolutionized data analytics. AI algorithms can uncover patterns, insights, and trends from complex data, enabling businesses to make data-driven decisions.  ## Benefits of AI AI offers several benefits, including:  - **Automation**: AI can automate repetitive and mundane tasks, freeing up human resources for more creative and complex activities.  - **Efficiency**: AI systems can process vast amounts of data quickly and accurately, enabling faster decision-making and problem-solving.  - **Personalization**: AI-powered systems can personalize experiences and recommendations based on user preferences, enhancing customer satisfaction.  - **Improved Safety**: AI can be used in applications such as autonomous vehicles and surveillance systems to improve safety and security.  ## Challenges and Ethical Considerations While AI offers immense potential, it also poses challenges and raises ethical concerns. Some key considerations include:  - **Data Privacy**: AI relies on vast amounts of data, raising concerns about privacy, data protection, and potential misuse.  - **Bias and Fairness**: AI algorithms can be biased, reflecting the biases present in the data used for training. Ensuring fairness and mitigating bias is crucial.  - **Job Displacement**: AI automation may lead to job displacement, requiring the workforce to adapt and acquire new skills.  - **Ethical Use**: AI applications should adhere to ethical standards and guidelines to ensure responsible and beneficial use.  ## Conclusion Artificial Intelligence continues to advance rapidly, transforming various industries and improving our lives. By leveraging AI technologies responsibly, we can harness its potential to solve complex problems, drive innovation, and create a better future.",
  };
  return (
    <main className="w-full flex justify-center text-white">
      <div className="max-w-[1000px] mt-[100px]">
        <header className="relative border-b-[1px] p-5">
          <div className="absolute bottom-0 right-0"></div>
          <div className="flex gap-3">
            <img src={article.cover} className="h-20" alt="Article Cover" />
            <div className="flex flex-col gap-1">
              <h1>{article.title}</h1>
              <p>{article.timestamp}</p>
              <ul></ul>
            </div>
          </div>
        </header>
        <div className="flex gap-10 p-5">
          <article className="text-justify">
            {article.article}
          </article>
          <aside>
            <UserSideInfo userID={article.userID} />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Aritcle;
