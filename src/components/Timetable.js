import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { storage } from '../firebase/firebase'
import Loading from "./Loading";


const Timetable = (props) => {

  const [image, setImage] = useState(null)
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState("")

// useEffect to grab to relevant image when page first loads

useEffect(() => {
  setLoading(true)
  storage.ref(`${props.uid}/images/timetable`).getDownloadURL()
  .then((url) => {

    if (url) {
      setUrl(url)
      setLoading(false)
    }
    
    // var xhr = new XMLHttpRequest();
    // xhr.responseType = 'blob';
    // xhr.onload = (event) => {
    //   var blob = xhr.response;
    // };
    // xhr.open('GET', url);
    // xhr.send();

  })
  .catch((error) => {
    console.log(error)
  });

}, [])


// When the input changes set the image state to the new image if the image size is acceptable.
  const onHandleChange = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0])

      if (e.target.files[0].size > 1000000) {
        return setError("Error: File size is too big")
      }
      setError("")
      setImage(e.target.files[0])
    }
  }


// When click to upload store the image in firebase using ref() and put().
  const onHandleUpload = () => {
    const uploadTask = storage.ref(`${props.uid}/images/timetable`).put(image)
    uploadTask.on(
      "state_changed", 
      snapshot => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setProgress(progress)
      },
      error => {
        console.log(error)
      },
      () => {
        storage.ref(`${props.uid}/images`).child('timetable').getDownloadURL().then(url => setUrl(url))
      }
    )
  }

    return (
        <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Timetable</h1>
          </div>
        </div>
        {loading ? <Loading /> : <div className="content-container">
          {url && <img className="timetable_img" src={url}/>}
        </div>}
        <div className="content-container" id="upload-input">
          <input type="file" onChange={onHandleChange}/>
          <button disabled={!!error || !image} onClick={onHandleUpload}>Upload</button>
          {progress !== 0 && (progress === 100 ? <p id="upload-complete">Upload complete!</p> : <progress id="progress-bar" value={progress} max="100" />)}
          {error && <p id="upload-error">{error}</p>}  
        </div>
        
    </div>
    )

}

const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid
  }
}

export default connect(mapStateToProps)(Timetable)