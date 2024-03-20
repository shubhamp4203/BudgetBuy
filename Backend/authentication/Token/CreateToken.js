const CreateToken = (id) => {

    return JWT.sign({ id }, process.env.SECRET_KEY,{
      expiresIn: maxAge,
    });
  };

const maxAge = 3 * 60 * 60 * 24;
