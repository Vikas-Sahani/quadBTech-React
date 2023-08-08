import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import QuadBTechLogo from "./assets/QuadBLogo.png";

function App() {
  const [showDetails, setShowDetails] = useState("");

  useEffect(() => {
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setShowDetails(data);
      });
  }, []);
  return (
    <div className=" text-center ">
      {/* Nav Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-danger">
        <div className="container-fluid">
          <a
            className="navbar-brand rounded-pill"
            href="https://quadbtech.com/"
          >
            <img
              src={QuadBTechLogo}
              alt="QuadBTechLogo"
              className="rounded-pill"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active text-light"
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link active text-light"
                  href="/summary"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Summary
                </a>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-light rounded-pill"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <br />
      <hr />

      <div className="d-flex justify-content-center">
        {showDetails ? (
          <div className="container row text-center">
            {showDetails.map((showDtl, i) => {
              let imgUrl = showDtl.show.image
                ? showDtl.show.image["original"]
                : null;
              return (
                <div key={i} className="card my-5 " style={{}}>
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      className="card-img-top"
                      alt={showDtl.show.name}
                    />
                  ) : (
                    <div
                      className="bg-danger text-light text-center"
                      style={{ height: "100%" }}
                    >
                      Image is not available
                      {/* <img src="" alt="404"/> */}
                    </div>
                  )}
                  <div className="card-body text-center d-flex flex-column justify-content-center ">
                    <h5 className="card-title">{showDtl.show.name}</h5>
                    <p className="card-text progress-bar progress-bar-striped">
                      <b>{showDtl.show.name}</b> is a{" "}
                      {showDtl.show.genres.join(" and ")} show in{" "}
                      {showDtl.show.language} that premiered on{" "}
                      {showDtl.show.premiered}. It is currently{" "}
                      {showDtl.show.status.toLowerCase()} and has an average
                      rating of {showDtl.show.rating.average}. Each episode has
                      a runtime of {showDtl.show.runtime} minutes. The show airs
                      on the and you can find more information on the{" "}
                      <a
                        href={showDtl.show.officialSite}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "rgb(220 220 0)",
                          textDecoration: "none",
                        }}
                      >
                        official site
                      </a>
                      .
                    </p>
                    <a href="/summary" className="btn btn-primary">
                      Summary
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          "There is no Show Details"
        )}
      </div>
    </div>
  );
}

export default App;
