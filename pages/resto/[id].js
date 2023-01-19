import axios from "axios";

const Detail = ({ restaurants }) => {
  return (
    <div>
      {/* Navigation*/}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="/">
            Back to Home
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
        </div>
      </nav>
      {/* Product section*/}
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={`http://localhost:1337${restaurants.data.attributes.image.data.attributes.url}`}
                alt="..."
              />
            </div>
            <div className="col-md-6">
              <h1 className="display-5 fw-bolder">
                {restaurants.data.attributes.name}
              </h1>
              <p className="lead">{restaurants.data.attributes.textlong}</p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer*/}
      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">
            @ valentinferlyharliyanti 1906
          </p>
        </div>
      </footer>
      {/* Bootstrap core JS*/}
      {/* Core theme JS*/}
    </div>
  );
};
export default Detail;

export async function getServerSideProps(req, res) {
  const response = await axios.get(
    `http://localhost:1337/api/restaurants/${req.query.id}?populate=*`
  );
  const restaurants = response.data;
  return {
    props: { restaurants }, // will be passed to the page component as props
  };
}
