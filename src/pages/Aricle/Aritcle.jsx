// React Markdown
import React, { useState, useEffect } from "react";

// JSX Elements
import { UserSideInfo } from "../../containers";
import { Badge, LoadingMessage, NewsLetter } from "../../components";

// JS
import {
  getArticleFileURL,
  getRandomArticles,
  likeArticle,
} from "../../js/firebaseFunctions";

// CSS
import "./article.css";

// Icons
import { FiMessageCircle } from "react-icons/fi";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { auth } from "../../config/firebase";

// Markdown
import ReactMarkdown from "react-markdown";
import { Buffer } from "buffer";
import matter from "gray-matter";

const Aritcle = () => {
  global.Buffer = global.Buffer || Buffer;

  const [loading, setLoading] = useState({});
  const [article, setTestArticle] = useState({});
  const [reaction, setReaction] = useState(null);

  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    setLoading(true);
    getRandomArticles(1).then((articles) => {
      const article = articles[0];
      const currentUserID = auth.currentUser.uid;
      setTestArticle(article);

      getArticleFileURL(article.articleStorageID)
        .then((url) =>
          fetch(url, {
            mode: "no-cors",
          })
        )
        .then((response) => response.text())
        .then((text) => {
          const { data, content } = matter(text);
          setMarkdown(content);
        })
        .catch((error) => console.error(error));

      if (article.likes.includes(currentUserID)) {
        setReaction(true);
      } else if (article.dislikes.includes(currentUserID)) {
        setReaction(false);
      } else {
        setReaction(null);
      }
      setLoading(false);
    });
  }, []);

  const formatTimestamp = (seconds) => {
    const date = new Date(seconds * 1000);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleString(undefined, options);
  };

  const handleLike = async () => {
    let newReaction = null;

    if (reaction !== true) {
      newReaction = true;
    }

    try {
      await likeArticle(article.articleID, newReaction, newReaction === null);
      setReaction(newReaction);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async () => {
    let newReaction = null;

    if (reaction !== false) {
      newReaction = false;
    }

    try {
      await likeArticle(article.articleID, newReaction, newReaction === null);
      setReaction(newReaction);
    } catch (error) {
      console.error(error);
    }
  };

  const articleMarkdown = `# The Power of Data Science

## Introduction
Data science is a multidisciplinary field that combines statistical analysis, machine learning, and programming to extract valuable insights and knowledge from data. It plays a crucial role in various industries and domains, revolutionizing decision-making processes and driving innovation.

## Data Science Process
The data science process typically involves the following steps:
1. **Data Collection**: Data scientists gather relevant data from various sources, including databases, APIs, and sensors. The quality and diversity of the data are crucial for accurate analysis and reliable results.
2. **Data Cleaning and Preprocessing**: Raw data often contain errors, missing values, or inconsistencies. Data cleaning and preprocessing techniques are applied to ensure data quality, standardization, and compatibility for analysis.
3. **Exploratory Data Analysis (EDA)**: EDA involves examining and visualizing the data to understand its characteristics, uncover patterns, and identify potential relationships between variables. This step helps in formulating hypotheses and guiding further analysis.
4. **Feature Engineering**: Feature engineering involves selecting, transforming, and creating meaningful features from the available data. It aims to enhance the predictive power of machine learning models and improve their performance.
5. **Model Building and Evaluation**: In this step, various machine learning algorithms are applied to the data to create predictive models. These models are trained and evaluated using appropriate evaluation metrics to assess their performance and generalization capability.
6. **Deployment and Monitoring**: Once a satisfactory model is developed, it is deployed in a production environment. Regular monitoring is essential to ensure the model's performance and accuracy over time, making necessary updates and refinements as needed.

## Applications of Data Science
Data science has numerous applications across industries, including:
- **Business Analytics**: Data science helps businesses analyze customer behavior, optimize marketing strategies, and make data-driven decisions to gain a competitive edge.
- **Healthcare**: Data science plays a vital role in analyzing medical data, predicting disease outcomes, improving patient care, and facilitating medical research.
- **Finance**: Data science enables financial institutions to detect fraud, assess risk, and make investment predictions using large-scale financial data analysis.
- **Transportation**: Data science helps optimize transportation systems, improve traffic management, and enable efficient logistics and route planning.

## Ethical Considerations and Challenges
Data science raises important ethical considerations and challenges:
- **Data Privacy and Security**: Safeguarding personal data and ensuring its secure handling and storage are paramount. Privacy regulations and ethical guidelines must be followed to protect individuals' privacy rights.
- **Bias and Fairness**: Data scientists must be aware of potential biases in the data and algorithms used. Fairness, transparency, and accountability should be prioritized to prevent discrimination and ensure equitable outcomes.
- **Interpretability and Explainability**: As models become more complex, the interpretability of their decisions becomes challenging. Ensuring transparency and explainability of algorithms is crucial, especially in critical domains like healthcare and justice.

## Conclusion
Data science empowers organizations to extract valuable insights from data, leading to better decision-making, improved efficiency, and enhanced innovation. Embracing ethical practices and addressing the challenges associated with data science can unlock its full potential and drive positive societal impact.
`;

  return (
    <main
      className={`h-full flex justify-center text-white pl-[260px] ${
        loading ? "h-screen flex justify-center items-center" : null
      }`}
    >
      {loading ? (
        <LoadingMessage message="Loading Article" />
      ) : (
        <div className="max-w-[1000px] mt-10 2xl:mt-[100px]">
          <header className="relative border-b-[1px] p-5">
            <ul className="absolute bottom-5 right-10 flex gap-5">
              <li>
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleLike}
                >
                  {reaction === true ? <AiFillLike /> : <AiOutlineLike />}
                  {article.likeCount}
                </button>
              </li>
              <li>
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleDislike}
                >
                  {reaction === false ? (
                    <AiFillDislike />
                  ) : (
                    <AiOutlineDislike />
                  )}
                  {article.dislikeCount}
                </button>
              </li>
              <li className="flex items-center gap-1">
                <FiMessageCircle />
                {article.comments.length}
              </li>
            </ul>
            <div className="flex gap-3">
              <img
                src={article.coverURL ? article.coverURL : null}
                className="w-[150px] h-[100px] object-cover rounded-md"
                alt="Article Cover"
              />
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold">{article.title}</h1>
                <p className="text-sm font-thin text-gpt-50">
                  {article.timestamp
                    ? formatTimestamp(article.timestamp.seconds)
                    : null}
                </p>
                <ul className="flex flex-wrap gap-1">
                  {article.tags
                    ? article.tags.map((tag) => <Badge key={tag} badge={tag} />)
                    : null}
                </ul>
              </div>
            </div>
          </header>
          <div className="flex gap-10 p-5">
            <article className="text-justify">
              <ReactMarkdown className="article">
                {markdown}
              </ReactMarkdown>
            </article>
            <aside className="flex flex-col gap-3">
              {article.authorID ? (
                <UserSideInfo authorID={article.authorID} />
              ) : null}
              <NewsLetter />
            </aside>
          </div>
        </div>
      )}
    </main>
  );
};

export default Aritcle;
