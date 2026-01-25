const Button = ( { name, count, handleClick } ) => {
      return (
            <button
                  className={`neon-btn ${ name === "DEC" ? "danger" : "" }`}
                  onClick={handleClick}
                  disabled={count <= 0 && name === "DEC"}
            >
                  {name}
            </button>
      );
};

export default Button;
