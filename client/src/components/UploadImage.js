import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useQuery, useMutation } from '@apollo/client';
import { GET_SINGLE_DOG } from '../utils/queries';
import { ADD_IMAGE } from '../utils/mutations';
import { useParams } from 'react-router-dom';

function UploadImage(dogDetails) {

  const {dogId} = useParams();

  const [addImage] = useMutation(ADD_IMAGE);

  const handleImageUpload = async (image_link) => {

    try {
     await addImage({
        variables: { id: dogId, name: dogDetails.dogDetails, link: image_link, caption: 'test'}
      });
    } catch (err) {
      console.error(err);
    }
  }

  let widget = window.cloudinary.createUploadWidget({
    cloudName: 'web-dev-projs-jaim', 
    uploadPreset: 'ml_default'}, (error, result) => { 
      if (!error && result && result.event === "success") { 

        handleImageUpload(result.info.url);
      }
    }
  )
  const showWidget = async (event) => { 
    widget.open();
   }

  
  return (
    <>
    <Button id="upload_widget" className='user-btn cloudinary-button' variant="danger"  variant="dark" onClick={showWidget}>Upload Image New</Button>
    </>
  );
}

export default UploadImage;