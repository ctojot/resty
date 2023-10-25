import React, { useState, useEffect } from 'react';
import './Form.scss';

function Form(props) {
  const [formData, setFormData] = useState({
    method: 'GET',
    url: '',
    body: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false); // Reset loading status on component mount.
  }, []);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading status before the request.
    await props.handleApiCall(formData);
    setIsLoading(false); // Reset loading status after the request.
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input
            name="url"
            type="text"
            value={formData.url}
            onChange={handleInputChange}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'GO!'}
          </button>
        </label>
        <label className="methods">
          {['GET', 'POST', 'PUT', 'DELETE'].map((method) => (
            <span key={method}>
              <input
                type="radio"
                name="method"
                value={method}
                checked={formData.method === method}
                onChange={handleInputChange}
              />
              {method}
            </span>
          ))}
        </label>
        {(formData.method === 'POST' || formData.method === 'PUT') && (
          <label>
            <span>Request Body: </span>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleInputChange}
            />
          </label>
        )}
      </form>
    </>
  );
}

export default Form;