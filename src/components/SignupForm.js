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
        

        <div className='errors'>
          <div>{errors.username}</div>
          <div>{errors.primaryemail}</div>
          <div>{errors.password}</div>
          <div>{errors.terms}</div>
        </div>
        
      </div>

      <div className='form-group inputs'>
        <h4>&nbsp;Enter the required information</h4>


        <label>Username:&nbsp;
          <input
            value={values.username}
            onChange={onChange}
            name='username'
            type='text'
            placeholder='type a username'
          />
        {errors.username.length > 0 ? <p>{errors.username}</p> : null}  
        </label>
        <br></br>
        <label>Email:&nbsp;
          <input
            type='email'
            name='primaryemail'
            onChange={onChange}
            value={values.primaryemail}
            placeholder='enter your e-mail'
          />
          {errors.primaryemail.length > 0 ? <p>{errors.primaryemail}</p> : null}
        </label>
        <br></br>
        <label>Password:&nbsp;
           <input
            type='password'
            name='password'
            onChange={onChange}
            value={values.password}
            placeholder='type a password'
          />
          {errors.password.length > 0 ? <p>{errors.password}</p> : null}
        </label>
        <br></br>
        <label>Terms
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