import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import StepOne from '../components/StepOne'; 
import StepTwo from '../components/StepTwo';
import StepThree from '../components/StepThree';
import StepFour from '../components/StepFour';

const Register = () => {
  const [step, setStep] = useState(1); 
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const handleNextStep = (data) => {
    setUserData((prevData) => ({ ...prevData, ...data }));
    setStep((prevStep) => prevStep + 1);
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/auth/register', userData);

      console.log('Registration successful:', response.data);
      
      return <Navigate to="/" />;
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  let stepComponent;
  switch (step) {
    case 1:
      stepComponent = <StepOne onNext={handleNextStep} />;
      break;
    case 2:
      stepComponent = <StepTwo onNext={handleNextStep} />;
      break;
    case 3:
      stepComponent = <StepThree onNext={handleNextStep} />;
      break;
    case 4:
      stepComponent = <StepFour onComplete={handleRegister} />;
      break;
    default:
      stepComponent = null;
      break;
  }

  return (
    <div className="flex justify-center center-items mt-9">
      <div className="">
        {stepComponent}
      </div>
    </div>
  );
};

export default Register;
