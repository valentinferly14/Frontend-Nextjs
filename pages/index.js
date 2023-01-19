import axios from "axios";
import { useState } from "react";
import Detail from "./resto/[id]";

const Home = ({ restaurants }) => {
  const [warung, setWarung] = useState(restaurants);
  const [cari, setCari] = useState("");
  function find(e) {
    setCari(e.target.value);
  }
  function submit(e) {
    e.preventDefault();
    const datafind = restaurants.data.filter(function (list) {
      return list.attributes.name.toLowerCase().includes(cari.toLowerCase());
    });
    setWarung({ data: datafind });
  }
  return (
    <div>
      {/* Navigation*/}
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="/">
            Restaurant
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
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          ></div>
        </div>
        <form
          className="d-flex"
          role="search"
          onSubmit={function (e) {
            submit(e);
          }}
        >
          <input
            onChange={function (e) {
              find(e);
            }}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </nav>
      {/* Header*/}
      <header className="bg-info py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">RESTO</h1>
            <p className="lead fw-normal text-black-50 mb-0">
              Beberapa rekomendasi restoran terbaik yang ada di Indonesia
            </p>
          </div>
        </div>
      </header>
      {/* Section*/}
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {warung.data.length > 0 ? (
              warung.data.map((resto) => {
                return (
                  <div className="col mb-5">
                    <div className="card h-100">
                      {/* Product image*/}
                      <img
                        className="card-img-top"
                        src={`http://localhost:1337${resto.attributes.image.data.attributes.formats.thumbnail.url}`}
                        alt="..."
                      />
                      {/* Product details*/}
                      <div className="card-body p-4">
                        <div className="text-center">
                          {/* Product name*/}
                          <h5 className="fw-bolder">{resto.attributes.name}</h5>
                          {/* Product desc*/}
                          {resto.attributes.description}
                        </div>
                      </div>
                      {/* Product actions*/}
                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center">
                          <a
                            className="btn btn-outline-dark mt-auto"
                            href={`/resto/${resto.id}`}
                          >
                            View More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2>
                <b>NOT FOUND</b>
              </h2>
            )}
          </div>
        </div>
      </section>
      {/* Footer*/}
      <footer className="py-5 bg-info">
        <div className="container">
          <p className="m-0 text-center text-black">
            @ valentinferlyharliyanti 1906
          </p>
        </div>
      </footer>
    </div>
  );
};
export default Home;

export async function getServerSideProps(context) {
  const res = await axios.get(
    "http://localhost:1337/api/restaurants?populate=*"
  );
  const restaurants = res.data;
  return {
    props: { restaurants }, // will be passed to the page component as props
  };
}
