
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import './CreateReciple.scss'
import axiosInstance from "../../axios";

const CreateRecipe = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [recipe, setRecipe] = useState({
        name: '',
        contentText: '',
        base64Image: '',
        fileName: ''
    });

    const changedFile = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        console.log(file.name);
        reader.onload = (e) => {
            let imgBase64 = e.target.result;
            setRecipe({...recipe, base64Image: imgBase64, fileName: file.name})
        }
        reader.readAsDataURL(file);
    }

    const submitRecipe = () => {
        setLoading(true);
        axiosInstance({
            method: 'POST',
            url: 'createRecept',
            data: {...recipe}
        }).then(res => {
            navigate('/ListRecipe')
            setLoading(false);
        }).catch(err => {
            setLoading(false);
        })
        console.log(recipe);
        
    }

    useEffect(() => {
        if (!localStorage.getItem('userId')) {
            navigate('/Login')
        }
    });

    return (
        <div className="container">
            <div className="__wrapper">
                <div className="form-group">
                    <label  htmlFor="inputAddress">Recipe Name</label>
                    <input onChange={(e) => {setRecipe({...recipe, name: e.target.value})}} type="text" className="form-control mt-1" placeholder="Cookies with jam" />
                </div>
                <div className="form-group mt-4">
                    <label  htmlFor="exampleFormControlTextarea1">Recipe Content</label>
                    <textarea onChange={(e) => {setRecipe({...recipe, contentText: e.target.value})}} className="form-control mt-1" placeholder="Lorem ipsum dolor sit amet...." rows="10"></textarea>
                </div>
                <div className="mt-3">
                    <label  htmlFor="formFileSm" className="form-label">Upload an image of your product:</label>
                    <input onChange={changedFile} className="form-control form-control-sm" type="file" />
                </div>
                <div style={{float: 'right'}}>
                    {loading &&<img className="mt-3" style={{marginRight: '10px'}} width="20" src="https://i.gifer.com/ZZ5H.gif" />}
                    <button onClick={submitRecipe} className="btn btn-success mt-3" >Save</button>
                </div>
            </div>
        </div>
    )
}

export default CreateRecipe;