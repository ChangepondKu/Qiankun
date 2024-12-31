import React, { useEffect, useState } from 'react';
import './User.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../api/apiRepository';
import Cookies from 'js-cookie';

export const User = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    address: '',
    profilePicture: '',
  });

  const [isEditing, setIsEditing] = useState(false); // Toggle for edit mode
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state?.app?.user);
 const state=useSelector((state)=>state?.app)
  useEffect(() => {
    if (userState) {
      setFormData({ ...userState });
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'profilePicture') {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          profilePicture: reader.result, // Store base64 image
        });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const authToken = Cookies.get('authToken');
    const authToken = state?.token;
    const response = await updateUser({ fullname: formData?.fullname, phone: formData?.phone,address:formData?.address, profile_pic: formData?.profilePicture }, authToken);
    if (response?.message === 'User updated successfully') {
      dispatch({ type: 'UPDATE_USER_DATA', payload: {...response?.user,profilePicture:response?.user?.profile_pic} });
      // Show the success modal and exit edit mode
      setIsModalVisible(true);
      setIsEditing(false);
    }
  };


  const closeModal = () => {
    setIsModalVisible(false); // Hide modal
    navigate('/app1'); // Navigate
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="container mb-2" style={{ marginTop: '100px', minHeight: '100vh' }}>
      <div className="row">
        <div className="col-md-4 text-center">
          <div className="card p-4 shadow-sm">
            <div className="card-body">
              <img
                src={formData.profilePicture || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg=='}
                alt="Profile"
                className="img-fluid rounded-circle mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              {isEditing && (
                <input
                  type="file"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleChange}
                  className="form-control mt-2"
                />
              )}
              <h4 className="mt-3">{formData.fullname || 'Your Name'}</h4>
              <p className="text-muted">{formData.email || 'Your Email'}</p>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm p-4">
            {!isEditing ? (
              <div className="card p-4 shadow-sm">
                <div className="card-header mb-4">
                  <h3 className="text-primary">Profile Details</h3>
                </div>
                <div className="row">
                  {/* Name */}
                  <div className="col-md-6 d-flex">
                    <strong className="w-50">Name:</strong>
                    <span>{formData.fullname || 'Not Available'}</span>
                  </div>

                  {/* Email */}
                  <div className="col-md-6 d-flex">
                    <strong className="w-50">Email:</strong>
                    <span>{formData.email || 'Not Available'}</span>
                  </div>
                </div>

                <div className="row mt-3">
                  {/* Phone Number */}
                  <div className="col-md-6 d-flex">
                    <strong className="w-50">Phone Number:</strong>
                    <span>{formData.phone || 'Not Available'}</span>
                  </div>

                  {/* Address */}
                  <div className="col-md-6 d-flex">
                    <strong className="w-50">Address:</strong>
                    <span>{formData.address || 'Not Available'}</span>
                  </div>
                </div>

                <div className="d-flex justify-content-center mt-4">
                  <button
                    className="btn btn-primary px-4"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

            ) : (
              <form onSubmit={handleSubmit} className="p-4 rounded shadow-lg bg-light">
                <h3 className="mb-4 text-primary text-center">Edit Profile</h3>
                <div className="row">
                  {/* Left Column */}
                  <div className="col-md-6">
                    <div className="mb-3 text-start">
                      <label className="form-label fw-medium align-items-left">
                        Full Name:
                      </label>
                      <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="mb-3 text-start">
                      <label className="form-label fw-medium">
                        Email:
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="mb-3 text-start">
                      <label className="form-label fw-medium">
                        Phone:
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="col-md-6">
                    <div className="mb-3 text-start">
                      <label className="form-label fw-medium">
                        Address:
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-control"
                        style={{ fontSize: '14px', height: '115px' }}
                        placeholder="Enter your address"
                        rows="6"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-4">
                  <button type="submit" className="btn btn-success btn-md px-3 me-2">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-md px-3"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isModalVisible && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-success">Success</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>Profile updated successfully!</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={closeModal}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
