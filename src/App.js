import './App.css';
import { useState, useEffect } from "react";
import axios from 'axios';


function App() {
  const [Rings, setRings] = useState([]);
  const [filterPhotos, setFilterPhotos] = useState([]);

  const getData = () => {
    axios.get('http://localhost:3002/Rings')
      .then((res) => {
        console.log(res?.data);
        setRings(res.data);
        setFilterPhotos(res.data);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getData();
  }, []);

  const filterFunction = (str) => {
    if (str === "All") {
      setFilterPhotos(Rings);
    } else {
      setFilterPhotos(Rings.filter((item) =>
        item.type.toLowerCase().includes(str.toLowerCase())
      ));
    }
  };

  return (
    <div>
      <h1>** Rings **</h1>

      <div className="selectmain">
        <select onChange={(e) => filterFunction(e.target.value)}>
          <option value="All">All</option>
          <option value="Diamond">Diamond</option>
          <option value="Golden">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Rose-gold">RoseGold</option>
        </select>
      </div>

      <div className="main-rings">
        {filterPhotos.map((item, index) => {
          return (
            <div className="ring" key={index}>
              <img src={item.image_url} alt={item.name} />
              <div className='index'>
                <h2>{index + 1}.</h2>
                <h2>{item.name}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;