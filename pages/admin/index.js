import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

function admin({ category }) {
  async function deletecategory(id) {
    const res = await axios.delete(
      `http://localhost:1337/api/categories/${id}`
    );
    alert("PENGHAPUSAN DATA BERHASIL");
    router.replace("/admin");
  }
  const [namakategori, setNama] = useState("");
  function change(e) {
    setNama(e.target.value);
  }
  const router = useRouter();
  async function send(e) {
    e.preventDefault();
    const postdata = await axios({
      url: 'http://localhost:1337/api/categories',
      method: "POST",
      data: {
        data: {
          name: namakategori,
        },
      },
    });
    alert("PENAMBAHAN DATA BERHASIL");
    setNama("")
    router.replace("/admin");
  }
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
        <h1 className="fs-4 text-center">ADMIN RESTO</h1>
        <form
          onSubmit={function (e) {
            send(e);
          }}
          className="p-2"
        >
          <div className="row d-flex justify-content-center">
            <div className="mb-3 col-lg-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Category Masakan
              </label>
              <input value={namakategori}
                type="text"
                onChange={function (e) {
                  change(e);
                }}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Add Category"
              />
              <button type="submit" className="btn btn-primary mt-3">
                Add
              </button>
            </div>
          </div>
          <div className="mb-3 col-lg-4"></div>
          <div className="row col-lg-4"></div>
        </form>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {category.data.map((datacategory, index) => {
              // console.log(datacategory)
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{datacategory.attributes.name}</td>
                  <td>
                    <Link  className="btn btn-outline-info mt-3 me-3" href={`/admin/edit/${datacategory.id}`}>Edit</Link>
                    {/* <button
                      type="submit"
                      className="btn btn-outline-warning mt-3 me-3"
                    >
                      Edit
                    </button> */}
                    <button
                      type="submit"
                      className="btn btn-secondary mt-3 me-3"
                      onClick={function () {
                        deletecategory(datacategory.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default admin;

export async function getServerSideProps(context) {
  const res = await axios.get("http://localhost:1337/api/categories");
  const category = res.data;
  return {
    props: { category }, // will be passed to the page component as props
  };
}
