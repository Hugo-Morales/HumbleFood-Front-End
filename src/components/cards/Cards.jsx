import Card from "./Card";

export const data = [{
  nombre: 'Hola',
  restaurante: 'MC Donals',
  precio: '2',
  descuento: '10',
  image: 'http://c.files.bbci.co.uk/DBBF/production/_105055265_bandejapaisa.jpg'
},
{
  nombre: 'Hamburguesa',
  restaurante: 'Coto',
  precio: '5',
  descuento: '123',
  image: 'https://static-sevilla.abc.es/media/gurmesevilla/2012/01/comida-rapida-casera.jpg'
},
{
  nombre: 'Hamburguesa',
  restaurante: 'Dia',
  precio: '5',
  descuento: '50',
  image: 'https://static-sevilla.abc.es/media/gurmesevilla/2012/01/comida-rapida-casera.jpg'
},
];

const Cards = () => {
  return (
    <div className='flex flex-wrap mt-5'>
      {
        data.map((m, index) => (
          <div key={index} className='mb-5 mr-5'>
            <Card prop={m} />
          </div>
        ))
      }
    </div>
  );
};

export default Cards;