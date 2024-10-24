export const registerFormControls = [
    {
      type: "text",
      name: "userName",
      placeholder: "Enter your user name",
      label: "User Name",
      componentType: "input",
    },

    {
        type: "email",
        name: "email",
        placeholder: "Enter your email address",
        label: "Email",
        componentType: "input",
        required: true
      },

      {
        type: "password",
        name: "password",
        placeholder: "Enter your password",
        label: "Password",
        componentType: "input",
        required: true

      },

   ]

   export const loginFormControls = [
    {
        type: "email",
        name: "email",
        placeholder: "Enter your email address",
        label: "Email",
        componentType: "input",
        required: true

      },

      {
        type: "password",
        name: "password",
        placeholder: "Enter your password",
        label: "Password",
        componentType: "input",
        required: true

      },

   ]