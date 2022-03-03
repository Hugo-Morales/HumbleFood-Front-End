const Card = ({ prop }) => {
    const { nombre, precio, descuento, image } = prop;

    console.log(nombre, precio, descuento, image);

    return (
        <div>
            <div>MeLlamo={nombre}</div>
            <div>ElDescuento={descuento}</div>
            <div >SoyImagen={image}</div>
            <div>precio={precio}</div>

            <div><button>Comprar</button></div>
            <div><button>✰</button></div>
        </div>
    );
};

export default Card;
