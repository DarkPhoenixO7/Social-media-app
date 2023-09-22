import React, { useState } from "react";
import Modal from "react-modal";
import "./modal.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../action/uploadAction";
import { updateUser } from "../../action/userAction";
const CreateModal = ({ modalOpen, setModalOpen, data }) => {
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileIamge, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profilePicture"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit =(e)=>{
   e.preventDefault()
   let userData = formData
   if(profileIamge){
      const data = new FormData()
      const filename = Date.now() + profileIamge.name
      data.append("name",filename)
      data.append("file", profileIamge)
      userData.profilePicture= filename
   try {
      dispatch(uploadImage(data))
   } catch (error) {
      console.log(error)
   }
  }

   if(coverImage){
         const data = new FormData()
         const filename = Date.now() + coverImage.name
         data.append("name",filename)
         data.append("file", coverImage)
         userData.coverPicture= filename
         try {
          dispatch(uploadImage(data))
       } catch (error) {
          console.log(error)
       }
    
   }
  
  dispatch(updateUser(params.id, userData))
  setModalOpen(false)
}

  return (
    <Modal
      className="modalInfo"
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      overlayClassName="react-modal-overlay"
    >
      <form className="detailForm">
        <h3>Your Info</h3>
        <div className="details">
          <input
            type="text"
            placeholder="Your First Name"
            className="infobox"
            name="firstname"
            onChange={handleChange}
            value={formData.firstname}
          />
          <input
            type="text"
            placeholder="Your Last Name"
            className="infobox"
            name="lastname"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Works at"
            className="infobox"
            name="worksat"
            onChange={handleChange}
            value={formData.worksat}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Lives In "
            className="infobox"
            name="livesin"
            onChange={handleChange}
            value={formData.livesin}
          />
          <input
            type="text"
            placeholder="Country"
            className="infobox"
            name="country"
            onChange={handleChange}
            value={formData.country}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Relationship Status"
            className="infobox"
            name="relationship"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>
        <div>
          Profile Image
          <input type="file" name="profilePicture" onChange={onImageChange}/>
          Cover Image
          <input type="file" name="coverPicture" onChange={onImageChange}/>
        </div>
        <button className="button" onClick={handleSubmit}>Update</button>
      </form>
    </Modal>
  );
};
export default CreateModal;
