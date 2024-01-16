import React, { useState, useContext, createContext } from 'react';

// Create a context to manage the state
const CardDetailsCon = createContext();

// Create a provider component to wrap the entire application
const CardDetailsProvide = ({ children }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvv: '',
  });

  const updateCardDetails = (field, value) => {
    setCardDetails({
      ...cardDetails,
      [field]: value,
    });
  };

  const resetCardDetails = () => {
    setCardDetails({
      cardNumber: '',
      cardHolder: '',
      expirationDate: '',
      cvv: '',
    });
  };

  return (
    <CardDetailsContext.Provider
      value={{ cardDetails, updateCardDetails, resetCardDetails }}
    >
      {children}
    </CardDetailsContext.Provider>
  );
};

// Custom hook to consume the context
const useCard = () => {
  const context = useContext(CardDetailsContext);
  if (!context) {
    throw new Error('useCardDetails must be used within a CardDetailsProvider');
  }
  return context;
};

// CardDetailsForm component
const CardDetails = () => {
  const { cardDetails, updateCardDetails, resetCardDetails } = useCardDetails();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateCardDetails(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to a server)
    console.log('Form submitted with:', cardDetails);
    resetCardDetails();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card Number:
        <input
          type="text"
          name="cardNumber"
          value={cardDetails.cardNumber}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Card Holder:
        <input
          type="text"
          name="cardHolder"
          value={cardDetails.cardHolder}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Expiration Date:
        <input
          type="text"
          name="expirationDate"
          value={cardDetails.expirationDate}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        CVV:
        <input type="text" name="cvv" value={cardDetails.cvv} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

// App component using the provider
const Apps = () => {
  return (
    <CardDetailsProvider>
      <CardDetailsForm />
    </CardDetailsProvider>
  );
};

// export default now;


