const Button = (props: any) => {
    return (
      <button className="px-12 py-2 bg-red-700 h-10 mt-2 px-6 rounded font-inter font-bold text-white text-center"
        type={props.type || 'button'}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );
  };
  
  export default Button;