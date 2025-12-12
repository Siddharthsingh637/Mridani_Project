const Title = ({ subtitle, title }) => {
    return (
      <div className="text-center my-8 mb-20">
        <p className="text-sm text-red-500 tracking-widest font-medium">{subtitle}</p>
        <h2 className="text-5xl md:text-5xl font-semibold text-gray-800 mt-4">{title}</h2>
      </div>
    );
  };
  
  export default Title;
  