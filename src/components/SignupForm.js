import React from 'react'

export default function SignupForm(props) {

      const {
        values,
        submit,
        change,
        disabled,
        errors,
        formValues,
        postNewUser,
      } = props

  const onChange = evt => {
    const { name, value, type, checked } = evt.target
    const valueToUse = type === 'checkbox' ? checked : value
    change(name, valueToUse)
  }

    const onSubmit = evt => {
        evt.preventDefault()
        postNewUser(formValues)
        submit()
    }

  return (
    <form className='form container' onSubmit={onSubmit}>
      <div className='form-group submit'>
        <h2>&nbsp;Join Us</h2>
        

        <div className='errors'>
          <div>{errors.username}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.terms}</div>
        </div>
        
      </div>

      <div className='form-group inputs'>
        <h4>&nbsp;Enter the required information</h4>


        <label>&nbsp;Username:&nbsp;
          <input
            value={values.username}
            onChange={onChange}
            name='username'
            type='text'
            placeholder='type a username'
          />
        {errors.username.length > 0 ? <p>{errors.username}</p> : null}  
        </label>
        {/* <br></br> */}
        <label>&nbsp;Email:&nbsp;
          <input
            type='email'
            name='email'
            onChange={onChange}
            value={values.email}
            placeholder='enter your e-mail'
          />
          {errors.email.length > 0 ? <p>{errors.email}</p> : null}
        </label>
        <br></br>
        <label>&nbsp;Password:&nbsp;
           <input
            type='password'
            name='password'
            onChange={onChange}
            value={values.password}
            placeholder='type a password'
          />
          {errors.password.length > 0 ? <p>{errors.password}</p> : null}
        </label>
        {/* <br></br> */}
        <label>&nbsp;Terms
           <input
            type='checkbox'
            name='terms'
            onChange={onChange}
            value={values.terms}
          />
        </label>
      </div>
      <button disabled={disabled}>submit</button>
    </form>
  )
}