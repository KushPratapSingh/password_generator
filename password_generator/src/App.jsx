import { useCallback, useEffect, useState } from 'react'

import './App.css'

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGeneraor = useCallback(() => {


    let str = 'QWERTYUIOPASDFGHJKLZXCVBNMqwerytuiopasdfhjklzxcvbnm';

    if (numberAllowed) str += '1234567890';

    if (charAllowed) str += '!~@#$%^&*';

    let pass = "";
    for (let i = 0; i < length; i++) {
      let ind = Math.floor(Math.random() * str.length);
      pass += str.charAt(ind);
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() =>{
  
    passwordGeneraor();
  },[length, charAllowed, numberAllowed, passwordGeneraor])


  const copyPass = ()=>{
    window.navigator.clipboard.writeText(password);
  }
  return (
    <>

      <div className='w-full max-w-md  shadow-md  mx-auto rounded-lg px-4 py-3 my-8 text-orange-400 bg-gray-700' >
        <h1 className='text-white text-center'>Pass Gen</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" className='outline-none py-1 px-3 w-full' value={password} placeholder='Password' readOnly />
          <button onClick={copyPass} className='outline-none bg-blue-400 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input onChange={(e) => setLength(e.target.value)} type="range" min={6} max={100} value={length} className='cursor-pointer ' />
            <label >Length : {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input  type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={() => {
              setNumberAllowed((prev) => (!prev));
            }} />
            <label htmlFor="">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input   type="checkbox" defaultChecked={charAllowed} id='charInput' onChange={() => {
              setCharAllowed((prev) => (!prev))
            }} />
            <label htmlFor="">Character</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
