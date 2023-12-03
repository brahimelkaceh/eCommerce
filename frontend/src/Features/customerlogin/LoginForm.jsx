import React from "react";

const LoginForm = () => {
  return (
    <div className="form-container sign-in-container">
      <form onSubmit={formik.handleSubmit}>
        <h1>Sign in</h1>
        <TextField
          size="small"
          className="input-field"
          type="email"
          name="email"
          id="in_email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          size="small"
          className="input-field"
          type="password"
          password="password"
          id="in_password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
        />
        <a
          href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
          target="_blank"
        >
          {message}
        </a>
        <button
          // onClick={handleSignin}
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
