
import React,{ useState, useEffect } from "react";
import axios from "axios";

const UpdateMovieCard = (props) => {
    console.log("UPDATE",props)
    const [ movie, setMovie ] = useState({
        id: null,
        title:"",
        director: "",
        metascore: "",
        stars: []
    })

    const id = props.match.params.id;

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then((res)=>{
            console.log("RES DATA",res);
            setMovie(res.data);
        })
        .catch(err => console.log(err));
    },[id]);

    const handleChange = e => {
        e.preventDefault();
        setMovie({...movie,[e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`,movie)
        .then(res=> {
            console.log(res);
            setMovie(res.data);
            props.history.push("/");
        })
        .catch(err => console.log(err));
    }

    return (
    <div className="formCont">
        <form onSubmit={handleSubmit} >

        <input
        type="text"
        name="title"
        placeholder="Movie Title"
        value={movie.title}
        onChange={handleChange}
        />
        <br/>

        <input
        type="text"
        name="director"
        placeholder="Movie Director"
        value={movie.director}
        onChange={handleChange}
        />
        <br/>

        <input
        type="num"
        name="metascore"
        placeholder="metascore"
        value={movie.metascore}
        onChange={handleChange}
        />
        <br/>

        <input
        type="text"
        name="stars"
        placeholder="Stars"
        value={movie.stars}
        onChange={handleChange}
        />
        <br/>

         <button type="submit">Update Movie</button>

        </form >
    
    </div>
    )
}


export default UpdateMovieCard;