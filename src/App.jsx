import './App.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

function App() {
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [bmiMsg, setBmiMsg] = useState('');

  /* conditional rendering */
  const [isAge, setIsAge] = useState(true);
  const [isHeight, setIsHeight] = useState(true);
  const [isWeight, setIsWeight] = useState(true);

  const validate = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (!!value.match(/^[0-9]*$/)) {
      if (name === "age") {
        setAge(value);
        setIsAge(true);
      } else if (name === "height") {
        setHeight(value);
        setIsHeight(true);
      } else {
        setWeight(value);
        setIsWeight(true);
      }
    } else {
      if (name === "age") {
        setAge(value);
        setIsAge(false);
      } else if (name === "height") {
        setHeight(value);
        setIsHeight(false);
      } else {
        setWeight(value);
        setIsWeight(false);
      }
    }
  }

  const handleReset = () => {
    setAge(0);
    setHeight(0);
    setWeight(0);
    setIsAge(true);
    setIsHeight(true);
    setIsWeight(true);
    setBmi('');
    setBmiMsg('');
  }

  const calculate = () => {
    let heightInMeters = height / 100;
    let calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(calculatedBmi);
    let message = '';
    if (calculatedBmi < 18.5) {
      message = 'You are Underweight';
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
      message = 'You are Normal weight';
    } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
      message = 'You are Overweight';
    } else {
      message = 'You are Obese';
    }
    setBmiMsg(message);
  }

  return (
    <>
      <div className='d-flex justify-content-center align-items-center' style={{ width: '100%', height: '100vh',backgroundColor:'lavender' }}>
        <div className='bg-light p-5 rounded' style={{ width: '500px',backgroundColor:'' }}>
          <h2 className='text-center text-success'>BMI CALCULATOR</h2>
          <p className='mt-3'>Body mass index (BMI) is a measure of body fat based on height and weight that applies to adult men and women. View the tool below to compute yours.</p>
          {bmi && bmiMsg && (
            <div className='mt-5 shadow d-flex justify-content-center align-items-center p-4 rounded flex-column'style={{backgroundColor:'lightcyan'}}>
              <h2 className='fs-2 fw-bolder'>{bmi}</h2>
              <h4>
                <span className="bmi-message">{bmiMsg}</span>
              </h4>
            </div>
          )}

          <form className='mt-4'>
            <div className="mb-3">
              <TextField id="outlined-basic" value={age || ""} name="age" label="Age" variant="outlined" className='w-100' onChange={(e) => validate(e)} />
              {!isAge && <p className='text-danger'>*Invalid input</p>}
            </div>
            <div className="mb-3">
              <TextField id="outlined-basic" value={height || ""} name="height" label="Height in c.m" variant="outlined" className='w-100' onChange={(e) => validate(e)} />
              {!isHeight && <p className='text-danger'>*Invalid input</p>}
            </div>
            <div className="mb-3">
              <TextField id="outlined-basic" value={weight || ""} name="weight" label="Weight in Kg" variant="outlined" className='w-100'
                onChange={(e) => validate(e)} />
              {!isWeight && <p className='text-danger'>*Invalid input</p>}
            </div>
            <div className="d-flex justify-content-between w-100 mt-4">
              <Button variant="contained" color="success" style={{ width: '190px', height: '60px' }} disabled={isAge && isHeight && isWeight ? false : true} onClick={calculate}>CALCULATE</Button>
              <Button variant="outlined" color='secondary' style={{ width: '190px', height: '60px' }} onClick={handleReset}>RESET</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
