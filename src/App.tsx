import "./style.css";
import texts from "./assets/texts.json";

export default function HomePage() {
  const $ = (selector: string) => document.querySelector(selector);

  const lang = window.localStorage.getItem("lang");
  const isEncrypt = window.localStorage.getItem("encrypt");

  if (!lang) window.localStorage.setItem("lang", "en");

  const { displacement, exchange, intro } = lang === "es" ? texts.es : texts.en;
  const [titleOriginal, titleEncrypt] = exchange;

  return (
    <>
      <div className="maxWidthPage">
        <div className="heroImage"></div>
        <header className="pageHeader"></header>
        <main className="mainContent">
          <h1 className="mainContent__title">Cryptsar</h1>
          <img src="/column.png" alt="" className="column column_left" />
          <img src="/column.png" alt="" className="column column_right" />
          <div className="containerWidth">
            <p id="introduction" className="introduction">
              {intro}
            </p>
            <form>
              <label htmlFor="displacement">{displacement}</label>
              <input
                type="number"
                name="displacement"
                id="displacement"
                placeholder="3"
                min="0"
                max="27"
              />
            </form>
            <section>
              <header className="action">
                <h2>{titleOriginal}</h2>
                <button
                  className="action__button"
                  aria-label="Cambiar a desencriptar mensaje"
                >
                  <svg
                    className="action__arrowBoth"
                    xmlns="http://www.w3.org/2000/svg"
                    width="800"
                    height="800"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#fff"
                      d="M7.78 5.97a.75.75 0 0 0-1.06 0l-5.25 5.25a.75.75 0 0 0 0 1.06l5.25 5.25a.75.75 0 0 0 1.06-1.06L3.81 12.5h16.38l-3.97 3.97a.75.75 0 1 0 1.06 1.06l5.25-5.25a.75.75 0 0 0 0-1.06l-5.25-5.25a.75.75 0 1 0-1.06 1.06L20.19 11H3.81l3.97-3.97a.75.75 0 0 0 0-1.06z"
                    />
                  </svg>
                </button>
                <h2>{titleEncrypt}</h2>
              </header>
              <div className="clipboardContainer">
                <div>
                  <div className="rope rope_top"></div>
                  <textarea
                    cols={30}
                    rows={10}
                    className="clipboard"
                  ></textarea>
                </div>
                <div>
                  <div className="rope rope_bottom"></div>
                  <textarea
                    cols={30}
                    rows={10}
                    className="clipboard"
                  ></textarea>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
      <script type="module" src="./index.js"></script>
    </>
  );
}
