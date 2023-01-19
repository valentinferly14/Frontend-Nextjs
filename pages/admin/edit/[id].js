import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
function EditPage({ category}) {
  console.log(category);
  const [namakategori, setNama] = useState(category.data.attributes.name);
  function change(e) {
    setNama(e.target.value);
  }
  const router = useRouter();
  async function send(e) {
    e.preventDefault();
    const postdata = await axios({
      url: `http://localhost:1337/api/categories/${category.data.id}`,
      method: "PUT",
      data: {
        data: {
          name: namakategori,
        },
      },
    });
    alert("DATA BERHASIL DIEDIT");
    setNama("");
    router.replace("/admin");
  }
  console.log(namakategori);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Restaurant
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav"></div>
        </div>
      </nav>
      <div className="container-fluid">
        <img src= "/assets/resto.png" className="rounded mx-auto d-block" alt="..."/>
        <h1 className="fs-4 text-center">Edit Category</h1>
        <form 
        onSubmit={function (e) {
          send(e);
        }}
        className="p-2">
          <div className="row d-flex justify-content-center">
            <div className="mb-3 col-lg-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Category
              </label>
              <input
              value={namakategori}
                type="text"
                onChange={function (e) {
                  change(e);
                }}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Resto"
              />
              <button type="submit" className="btn btn-primary mt-3">
                Edit
              </button>
            </div>
          </div>
          <div className="mb-3 col-lg-4"></div>
          <div className="row col-lg-4"></div>
        </form>
        <table className="table table-striped"></table>
      </div>
    </div>
  );
}

export default EditPage;

export async function getServerSideProps(req, res) {
  const response = await axios.get(
    `http://localhost:1337/api/categories/${req.query.id}`
  );
  const category = response.data;
  return {
    props: { category }, // will be passed to the page component as props
  };
}
