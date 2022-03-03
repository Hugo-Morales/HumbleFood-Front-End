import Card from "../../components/card_producto/Card";

export const data = [{
  nombre: 'Hola',
  precio: '$2',
  descuento: '10%',
  image: 'asdas'
},
{
  nombre: 'Chau',
  precio: '$5',
  descuento: '123%',
  image: 'asdas'
},
];

const Productos = () => {
  return (
    <div>
      {
        data.map((m, index) => (
          <Card prop={m} key={index} />
        ))
      }
    </div>
  );
};

export default Productos;