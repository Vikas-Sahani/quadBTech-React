import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home(props) {
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
    <div>
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
                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="card-title">{showDtl.show.name}</h5>
                    <p className="card-text p-3 rounded-pill progress-bar bg-warning progress-bar-striped by-warning">
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
                          color: "red",
                          textDecoration: "none",
                        }}
                      >
                        official site
                      </a>
                    </p>
                    <Link
                      //   to={`/summary:${showDtl.show.name}`}
                      to={`/summary`}
                      className="btn btn-primary rounded-pill"
                      onClick={() => {
                        props.showSummary(showDtl.show.summary);
                      }}
                    >
                      Summary
                    </Link>
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

export default Home;
