import { Container, Carousel, Card } from "react-bootstrap";
import "./BestShopSlider.css";

function BestShopsSlider() {
  const products = [
    {
      id: 1,
      name: "Cream Puff",
      price: "$11.00",
      image:
        "https://wpbingo-jumys.myshopify.com/cdn/shop/files/product-22_540x.webp?v=1719559014",
    },
    {
      id: 2,
      name: "Burant Orange Dreamsicle",
      price: "$12.00",
      image:
        "https://wpbingo-jumys.myshopify.com/cdn/shop/files/product-19_900x.webp?v=1719558435",
    },
    {
      id:3,
      name: "Brown Sugar Cinnamon",
      price: "$10.00 - $13.00",
      image:
        "https://wpbingo-jumys.myshopify.com/cdn/shop/files/product-1_900x.webp?v=1719558508",
    },
    {
      id: 4,
      name: "Cream Puff",
      price: "$11.00",
      image:
        "https://wpbingo-jumys.myshopify.com/cdn/shop/files/product-13_1080x1080.webp?v=1719561700",
    },
    {
      id: 5,
      name: "Chocolate",
      price: "$10.00",
      image:
        "https://wpbingo-jumys.myshopify.com/cdn/shop/files/product-14_900x.webp?v=1719559069",
    },
    {
      id: 6,
      name: "Double Dough",
      price: "$10.00",
      image:
        "https://wpbingo-jumys.myshopify.com/cdn/shop/files/product-2_900x.webp?v=1719559119",
      sale: "-23%",
    },
    {
      id: 7,
      name: "Cold Brew With Coconut Cream",
      price: "$12.00",
      image:
        "https://wpbingo-jumys.myshopify.com/cdn/shop/files/product-20_900x.webp?v=1719558769",
    },
    {
      id: 8,
      name: "Cookies In Cream",
      price: "$10.00 - $13.00",
      image:
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
    }
  ];

  const chunkSize = 4;
  const groupedProducts = [];
  for (let i = 0; i < products.length; i += chunkSize) {
    groupedProducts.push(products.slice(i, i + chunkSize));
  }

  return (
    <section className="shops-section">
      <Container>
        <h2 className="text-center main-title">
          Best Ice Cream Shops
        </h2>

        <Carousel indicators={false} interval={3000}>
          {groupedProducts.map((group, index) => (
            <Carousel.Item key={index}>
              <div className="product-row">
                {group.map((product) => (
                  <Card key={product.id} className="product-card">

                    <div className="image-box">
                      {product.sale && (
                        <span className="sale-badge">
                          {product.sale}
                        </span>
                      )}
                      <Card.Img
                        variant="top"
                        src={product.image}
                      />
                    </div>

                    <Card.Body>
                      <Card.Title className="product-title">
                        {product.name}
                      </Card.Title>

                      <p className="price">
                        {product.price}
                      </p>
                    </Card.Body>

                  </Card>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

      </Container>
    </section>
  );
}

export default BestShopsSlider;