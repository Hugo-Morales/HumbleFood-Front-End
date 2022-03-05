import Card from "./Card";


export const data = [
  {
    id: 0,
    nombre: "Milanesa",
    restaurante: "MC Donals",
    precio: "2",
    descuento: "10",
    image:
      "http://c.files.bbci.co.uk/DBBF/production/_105055265_bandejapaisa.jpg",
    image2: "https://www.paulinacocina.net/wp-content/uploads/2015/03/P1150541-e1439164269502.jpg",
    image3: "https://saborgourmet.com/wp-content/uploads/milanesa-napolitana-de-argentina-ingredientes.jpg",
    image4: "https://www.196flavors.com/wp-content/uploads/2020/03/milanesa-a-la-napolitana-1-FP.jpeg",
    stock: 10,
  },
  {
    id: 1,
    nombre: "Hamburguesa",
    restaurante: "Coto",
    precio: "5",
    descuento: "123",
    image:
      "https://static-sevilla.abc.es/media/gurmesevilla/2012/01/comida-rapida-casera.jpg",
    image2: "https://www.saborusa.com/wp-content/uploads/2019/10/Rompe-la-rutina-con-una-suculenta-hamburguesa-con-queso-Foto-destacada.png",
    image3: "https://www.cocinayvino.com/wp-content/uploads/2022/01/www.cocinayvino.com-cocinayvino-hamburguesa-leo-messi-por-hard-rock-cafe-e1642607850331-1200x900.jpg",
    image4: "https://gourmetdemexico.com.mx/wp-content/uploads/2021/05/dia-de-la-hamburguesa.jpg",
    stock: 7,
  },
  {
    id: 2,
    nombre: "Hamburguesa",
    restaurante: "Dia",
    precio: "5",
    descuento: "50",
    image:
      "https://static-sevilla.abc.es/media/gurmesevilla/2012/01/comida-rapida-casera.jpg",
    image2: "https://www.saborusa.com/wp-content/uploads/2019/10/Rompe-la-rutina-con-una-suculenta-hamburguesa-con-queso-Foto-destacada.png",
    image3: "https://www.cocinayvino.com/wp-content/uploads/2022/01/www.cocinayvino.com-cocinayvino-hamburguesa-leo-messi-por-hard-rock-cafe-e1642607850331-1200x900.jpg",
    image4: "https://gourmetdemexico.com.mx/wp-content/uploads/2021/05/dia-de-la-hamburguesa.jpg",
    stock: 12,
  },
];

const Cards = ({ handleAddToCart }) => {
  return (
    <div className="flex flex-wrap mt-5">
      {data.map((m, index) => (
        <div key={index} className="mb-5 mr-5">
          <Card handleAddToCart={handleAddToCart} prop={m} />
        </div>
      ))}
    </div>
  );
};

export default Cards;
