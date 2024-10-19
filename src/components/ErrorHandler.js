
export const Errorhandler = (data, navigate, toast) => {
  console.log(data);
        if (data.status == 403 || data.status == 401) {
          navigate("/")
          toast.error("Session expired!");
        } else {
          toast.error(data.error.message);
        }
      }