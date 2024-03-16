const CreateToken = (id) => {

    return JWT.sign({ id }, "Secret Key", {
      expiresIn: maxAge,
    }); //this secret key is not not shared anywhere and it is kept quite long
  };

const maxAge = 3 * 60 * 60 * 24;
