const FormContainer = ({ children }) => {
  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-center">
        <div className="w-full max-w-md p-5 bg-white shadow-md rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
