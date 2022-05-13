import React, { useState } from "react";

 
// import the service file since we need it to send (and get) the data to(from) the server
import service from "../service";
 
function CreatePost (){
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [type, setType] = useState("");
  const [framesize, setFramesize] = useState("");
  const [framematerial, setFramematerial] = useState("");
  const [brakes, setBrakes] = useState("");
  const [tubes, setTubes] = useState("");
  const [years, setYears] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("Berlin");
 
  const handleFileUpload = e => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
 
    const uploadData = new FormData();
 
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);
 
    service
      .uploadImage(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // response carries "secure_url" which we can use to update the state
        setImageUrl(response.secure_url);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };
  const handleSubmit = e => {
    e.preventDefault();
 
    service
      .createPost({ title, description, imageUrl, type, framesize, framematerial, brakes, tubes, years, zipcode, city })
      .then(res => {
        // console.log("added new movie: ", res);
 
        // Reset the form
        setTitle("");
        setDescription("");
        setImageUrl("");
        setType("");
        setFramesize("");
        setFramematerial("");
        setBrakes("");
        setTubes("");
        setYears("");
        setZipcode("");
        setCity("Berlin");
      
        // here you would redirect to some other page      
      })
      .catch(err => console.log("Error while adding the new movie: ", err));
  };
 
  return (
    <div >

        <form className="form" onSubmit={handleSubmit}>
        <label>Title *</label>
        <input type="text" name="title" value={title} 
          onChange={(e) => setTitle(e.target.value)}/>

        <label htmlFor="type">Type of bike:</label>

        <select id="type" name="type" value={type} 
          onChange={(e) => setType(e.target.value)}>
        <option value="city">City Bike</option>
        <option value="road">Road Bike</option>
        <option value="singlespeed">Single Speed/FixedGear</option>
        <option value="mtb">Mountain Bike</option>
        <option value="folding">Folding Bike</option>
        <option value="bmx">BMX</option>
        </select>
          
        <label>Frame Size</label>
        <select id="framesize" name="framesize" value={framesize} 
          onChange={(e) => setType(e.target.value)}>
        <option value="-38">-38cms (xxs)</option>
        <option value="38-40">38 - 40cms (xxs)</option>
        <option value="40-42">40 - 42cms (xxs)</option>
        <option value="42-44">42 - 44cms (xxs)</option>
        <option value="44-46">44 - 46cms (xs)</option>
        <option value="46-48">46 - 48cms (S)</option>
        <option value="46-48">48 - 50cms (S)</option>
        <option value="48-50">50 - 52cms (M)</option>
        <option value="50-52">52 - 54cms (M)</option>
        <option value="52-54">54 - 56cms (M)</option>
        <option value="54-56">56 - 58cms (L)</option>
        <option value="56-58">58 - 60cms (L)</option>
        <option value="+60">+60cms (XL)</option>
        </select>

        <label>Frame Material</label>
        <select type="text" name="framematerial" value={framematerial} 
          onChange={(e) => setFramematerial(e.target.value)}>
        <option value="steel">Steel </option>
        <option value="aluminum">Aluminum</option>
        <option value="carbon">Carbon</option>
        <option value="titanium/magnesium">Titanum/magnesium</option>
        </select>      

        <label>Brakes</label>
        <input type="text" name="brakes" value={brakes} 
          onChange={(e) => setBrakes(e.target.value)}/>

        <label>Tubes</label>
        <input type="tubes" name="tubes" value={tubes} 
          onChange={(e) => setTubes(e.target.value)}/>

        <label>Years Old</label>
        <input type="years" name="years" value={years} 
          onChange={(e) => setYears(e.target.value)}/>

        <label>Zip Code</label>
        <input type="zipcode" name="zipcode" value={zipcode} 
          onChange={(e) => setZipcode(e.target.value)}/>

        <label>City</label>
        <input type="city" name="city" value={city} 
          onChange={(e) => setCity(e.target.value)}/>   
 
        <label>Description *</label>
        <textarea type="text" name="description" value={description}
          onChange={(e) => setDescription(e.target.value)} />

        <label>Upload a file *</label>
        <input type="file" onChange={(e) => handleFileUpload(e)} />
        {/* <input type="file" onChange={(e) => handleFileUpload(e)} />
        <input type="file" onChange={(e) => handleFileUpload(e)} /> */}
 
        <button type="submit">Create new Post</button>
      </form>
    </div>
  );
}
 
export default CreatePost;