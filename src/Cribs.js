import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import CribsData from "./CribsData.js";
import axios from "axios";

const Cribs = () => {
  const [cribs, setCribs] = useState([]);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [id, setid] = useState(null);
  const [pass, setPass] = useState(true);
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");

  let GetData= async () => {
    try {
      const cribs = await axios.get("https://fyz-cribs-app.herokuapp.com/cribs");
      setCribs([...cribs.data]);
    } catch (error) {
      console.log(error);
    }
  }

  let handleCreate = async () => {
    try {
      const create = await axios.post("https://fyz-cribs-app.herokuapp.com/cribs", {
        name: name,
        pic: img,
        location: location,
      });
      setName("");
      setImg("");
      setLocation("");
      GetData();
    } catch (error) {
      console.log(error);
    }
  };
  let handleUpdate = async (id) => {
    try {
      const update = await axios.put(`https://fyz-cribs-app.herokuapp.com/cribs/${id}`, {
        name: name,
        pic: img,
        location: location,
      });
      setName("");
      setImg("");
      setLocation("");
      GetData();
    } catch (error) {
      console.log(error);
    }
  };
  let handleEdit = (id, name, pic, location) => {
    setPass(!pass);
    setid(id);
    pass ? setName(name) : setName("");
    pass ? setImg(pic) : setImg("");
    pass ? setLocation(location) : setLocation("");
  };

  let handleDelete = async (id) => {
    try {
      const del = await axios.delete(`https://fyz-cribs-app.herokuapp.com/cribs/${id}`);
      GetData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <div className="row">
      <div className="col-lg-3 ">
        <h3> Create / Edit </h3>
        <input
          value={name}
          className="form-control mt-2"
          onChange={(event) => setName(event.target.value)}
          type="text"
          placeholder="Name"
        />

        <input
          value={img}
          className="form-control mt-2"
          onChange={(e) => setImg(e.target.value)}
          type="text"
          placeholder="Image Url"
        />

        <input
          value={location}
          className="form-control mt-2"
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          placeholder="Location"
        />

        <button
          className="btn btn-block btn-primary mt-2 mb-2"
          onClick={() =>
            name !== false && img !== false && location !== false
              ? pass
                ? handleCreate()
                : handleUpdate(id)
              : ""
          }
        >
          Submit
        </button>
      </div>
      <div className="col-lg-9">
        <div className="input-group mb-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            placeholder="Search by name ..."
            aria-label="Recipient's name"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">
              Search
            </button>
          </div>
        </div>

        <div className="card-deck">
          {cribs
            .filter((obj) => obj.name.includes(search))
            .map((obj, id) => (
              <CribsData
                key={id}
                id={obj._id}
                name={obj.name}
                pic={obj.pic}
                location={obj.location}
                edit={handleEdit}
                update={handleUpdate}
                delete={handleDelete}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Cribs;
