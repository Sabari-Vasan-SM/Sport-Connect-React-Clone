import React, { useState } from 'react';
import '../styles/CreatePostModal.css';

function CreatePostModal({ onClose, onSubmit }) {
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    
    // Create preview URLs
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!description.trim()) {
      alert('Please enter a description');
      return;
    }

    // Show success message
    setShowSuccess(true);
    
    // Submit the post data
    const postData = {
      description,
      image: previewUrls[0] || null, // Use first image for now
      files: selectedFiles
    };

    // Delay to show success animation
    setTimeout(() => {
      onSubmit(postData);
      
      // Clean up preview URLs
      previewUrls.forEach(url => URL.revokeObjectURL(url));
      
      onClose();
    }, 1500);
  };

  const handleClose = () => {
    // Clean up preview URLs
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    onClose();
  };

  return (
    <div className="popup-container" onClick={handleClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        {!showSuccess ? (
          <>
            <div className="popup-header">
              <h3>Create a New Post</h3>
              <button className="close-btn" onClick={handleClose}>
                <i className="uil uil-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="postFile" className="custom-file-btn">
                  Choose files
                </label>
                <input
                  type="file"
                  id="postFile"
                  accept="image/*, video/*"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
              
              {previewUrls.length > 0 && (
                <div className="file-preview">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="preview-item">
                      {selectedFiles[index].type.startsWith('image/') ? (
                        <img src={url} alt={`Preview ${index + 1}`} />
                      ) : (
                        <video src={url} controls />
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="postDescription">Description</label>
                <textarea
                  id="postDescription"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's happening in sports today?"
                  required
                />
              </div>
              
              <button type="submit" className="btn btn-primary">
                Post
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <div className="tick-mark">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="25" fill="none" />
                <path fill="none" stroke="#4caf50" strokeWidth="5" d="M14 27l7 7 16-16" />
              </svg>
            </div>
            <p>Posted Successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePostModal;