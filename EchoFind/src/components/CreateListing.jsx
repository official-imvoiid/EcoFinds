import React, { useState } from 'react';

const CreateListing = ({ currentUser }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Electronics',
    price: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [imageUploadType, setImageUploadType] = useState('url');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({});

  const categories = ['Electronics', 'Clothing', 'Books', 'Furniture', 'Sports', 'Toys', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for the field on change
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, image: 'Please upload an image file' }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: 'Image size should be less than 5MB' }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setErrors((prev) => ({ ...prev, image: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) newErrors.price = 'Please enter a valid positive price';

    // Optional image validation (e.g., if provided, check validity)
    if (imageUploadType === 'url' && imageUrl && !isValidUrl(imageUrl)) {
      newErrors.image = 'Please enter a valid image URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return url.match(/\.(jpeg|jpg|gif|png|webp)$/i) !== null;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const products = JSON.parse(localStorage.getItem('products') || '[]');

    const newProduct = {
      id: Date.now(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      price: parseFloat(formData.price),
      image: imageUploadType === 'upload' ? uploadedImage : imageUrl,
      userId: currentUser.id,
      username: currentUser.username,
    };

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Reset form
    setFormData({
      title: '',
      description: '',
      category: 'Electronics',
      price: '',
    });
    setImageUrl('');
    setUploadedImage(null);
    setErrors({});
  };

  const handleRemoveImage = () => {
    if (imageUploadType === 'url') {
      setImageUrl('');
    } else {
      setUploadedImage(null);
    }
    setErrors((prev) => ({ ...prev, image: '' }));
  };

  const previewSrc = imageUploadType === 'url' ? imageUrl : uploadedImage;

  return (
    <div className="create-listing-container">
      <h2>Create New Listing</h2>

      {showSuccess && (
        <div className="success-message" role="alert">
          Listing created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
            aria-required="true"
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && <span id="title-error" className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe your product"
            aria-required="true"
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'description-error' : undefined}
          />
          {errors.description && <span id="description-error" className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($) *</label>
          <input
            id="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="0.00"
            aria-required="true"
            aria-invalid={!!errors.price}
            aria-describedby={errors.price ? 'price-error' : undefined}
          />
          {errors.price && <span id="price-error" className="error-message">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label>Product Image (optional)</label>

          <div className="retro-radio-container" style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '15px',
            padding: '10px',
            backgroundColor: '#f7fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <label className="retro-radio-label" style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: '16px'
            }}>
              <input
                type="radio"
                value="url"
                checked={imageUploadType === 'url'}
                onChange={(e) => setImageUploadType(e.target.value)}
                className="retro-radio"
                style={{ display: 'none' }}
              />
              <span className="retro-radio-custom" style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: '2px solid #3182ce',
                marginRight: '8px',
                position: 'relative',
                backgroundColor: imageUploadType === 'url' ? '#3182ce' : 'white'
              }}>
                {imageUploadType === 'url' && (
                  <span style={{
                    position: 'absolute',
                    top: '4px',
                    left: '4px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'white'
                  }}></span>
                )}
              </span>
              Image URL
            </label>
            
            <label className="retro-radio-label" style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: '16px'
            }}>
              <input
                type="radio"
                value="upload"
                checked={imageUploadType === 'upload'}
                onChange={(e) => setImageUploadType(e.target.value)}
                className="retro-radio"
                style={{ display: 'none' }}
              />
              <span className="retro-radio-custom" style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: '2px solid #3182ce',
                marginRight: '8px',
                position: 'relative',
                backgroundColor: imageUploadType === 'upload' ? '#3182ce' : 'white'
              }}>
                {imageUploadType === 'upload' && (
                  <span style={{
                    position: 'absolute',
                    top: '4px',
                    left: '4px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'white'
                  }}></span>
                )}
              </span>
              Upload Image
            </label>
          </div>

          {imageUploadType === 'url' && (
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
              aria-invalid={!!errors.image}
              aria-describedby={errors.image ? 'image-error' : undefined}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          )}

          {imageUploadType === 'upload' && (
            <div>
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleImageUpload}
                aria-invalid={!!errors.image}
                aria-describedby={errors.image ? 'image-error' : undefined}
                style={{
                  marginBottom: '10px',
                  fontSize: '16px'
                }}
              />
              <p className="help-text" style={{
                fontSize: '14px',
                color: '#718096',
                marginTop: '5px'
              }}>
                Accepted formats: JPG, PNG, GIF, WebP (Max size: 5MB)
              </p>
            </div>
          )}

          {errors.image && <span id="image-error" className="error-message">{errors.image}</span>}

          {previewSrc && (
            <div className="image-preview" style={{ marginTop: '15px' }}>
              <p className="preview-label" style={{ fontWeight: 'bold', marginBottom: '10px' }}>Image Preview:</p>
              <div className="preview-container" style={{
                width: '200px',
                height: '200px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img
                  src={previewSrc}
                  alt="Product preview"
                  className="preview-image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #718096;">Invalid image</div>';
                  }}
                />
              </div>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="remove-button"
                style={{
                  marginTop: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#e53e3e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary" style={{
          padding: '12px 24px',
          backgroundColor: '#3182ce',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          marginTop: '20px'
        }}>
          Create Listing
        </button>
      </form>
    </div>
  );
};

export default CreateListing;