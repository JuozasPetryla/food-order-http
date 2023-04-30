import {useState} from 'react'

const useInput = (validationLogic) => {
  const [inputValue, setInputValue] = useState('')
  const [inputTouched, setInputTouched] = useState(false)

  const inputIsValid = validationLogic(inputValue);
  const inputShowError = !inputValue && inputTouched

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value)
  }

  const inputBlurHandler = () => {
    setInputTouched(true)
  }

  const reset =() =>  {
    setInputValue('')
    setInputTouched(false)
  }

  return {
    inputValue,
    inputShowError,
    inputIsValid,
    inputBlur: inputBlurHandler,
    inputChange: inputChangeHandler,
    reset
  }
}

export default useInput