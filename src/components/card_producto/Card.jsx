const Card = ({ prop }) => {
    const { nombre, precio, descuento, image } = prop;

    console.log(nombre, precio, descuento, image);

    return (
        <div>
            Hola soy App
        </div>
    );
};

export default Card;
