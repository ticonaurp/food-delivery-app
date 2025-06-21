export const restaurants = [
  {
    id: "1",
    name: "Bottega Ristorante",
    rating: 4.6,
    reviews: 1683,
    price: 49,
    distance: "4.6",
    deliveryTime: "15 min",
    description: "Italian restaurant with various dishes",
    promo: "Extra discount",
    freeDelivery: true,
    imageUrl:
      {uri:"https://www.cocinadelirante.com/800x600/filters:format(webp):quality(75)/sites/default/files/images/2023/03/gastronomias-patrimonio-humanidad-italiana.jpg"},
    menu: {
      Popular: [
        {
          name: "Pasta Carbonara",
          price: 12,
          image: {
            uri: "https://media.istockphoto.com/id/1087833884/es/foto/bolo%C3%B1esa-de-espaguetis-de-pasta-tradicional-en-plato-blanco-sobre-fondo-de-mesa-de-madera.jpg?s=170667a&w=0&k=20&c=cA1rv-Y8bT6D0MZPH44JerTpAkQMmGK8qJqPH9v3sio=",
          },
        },
        {
          name: "Margherita Pizza",
          price: 10,
          image: {
            uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/68/65/68/apache-balbriggan.jpg?w=800&h=500&s=1",
          },
        },
      ],
      "Main Courses": [
        {
          name: "Risotto alla Milanese",
          price: 14,
          image: {
            uri: "https://eu.tastescdn.net/thumbor/FPlA8RzQu6v3MHUWFp7hUJHrlIk=/1050x1050/filters:quality(65):brightness(2):contrast(2):rgb(2,-2,0):sharpen(0.2,0.2,true)/es/recipe/QD4zo5KuA-Zb3rF50As1/6802642f2c90ae9093dd6bf2f4d83c.jpeg",
          },
        },
      ],
      Appetizer: [
        {
          name: "Bruschetta",
          price: 6,
          image: {
            uri: "https://t4.ftcdn.net/jpg/12/30/06/33/360_F_1230063324_a7cd9bmpqrm5gdbLjKhIdwyD1OQZD2jt.jpg",
          },
        },
      ],
    },
  },
  {
    id: "2",
    name: "Soulfood Jakarta",
    rating: 4.3,
    reviews: 1248,
    price: 35,
    distance: "2.8",
    deliveryTime: "20 min",
    description: "Delicious Indonesian soul food",
    promo: "Buy 1 Get 1",
    freeDelivery: false,
    imageUrl: {
      uri: "https://scontent-lim1-1.cdninstagram.com/v/t51.29350-15/272930871_252204833601220_5185723530919113767_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjI5MzUwLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=scontent-lim1-1.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2QEggRZNRJCToWbHqTE3C-gEKI5k1gP33MLJ3pYWroVwRAjE_FVoAMymgJ_wwkqsw1FKwZjHy3l1j_tJ_GTYSM1-&_nc_ohc=g5FLAY-RpQYQ7kNvwHIF2iW&_nc_gid=iD1ZCq0EJ5RV32q5EXpzxw&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=Mjc2MDg5MTczNzM2OTkzOTQyMA%3D%3D.3-ccb7-5&oh=00_AfPmc6tjddhdIiLJwofsWfpTlXhZi9bIcU45R8Z9erx6Yg&oe=6857A07A&_nc_sid=10d13b",
    },
    menu: {
      Popular: [
        {
          name: "Nasi Goreng",
          price: 9,
          image: {
            uri: "https://t4.ftcdn.net/jpg/12/30/06/33/360_F_1230063324_a7cd9bmpqrm5gdbLjKhIdwyD1OQZD2jt.jpg",
          },
        },
        {
          name: "Ayam Penyet",
          price: 11,
          image: {
            uri: "https://t4.ftcdn.net/jpg/12/30/06/33/360_F_1230063324_a7cd9bmpqrm5gdbLjKhIdwyD1OQZD2jt.jpg",
          },
        },
      ],
      "Main Courses": [
        {
          name: "Rendang Daging",
          price: 13,
          image: {
            uri: "https://warungindostar.com/wp-content/uploads/2023/03/043061400_1600750232-shutterstock_1786027046-1024x576.webp",
          },
        },
      ],
      Appetizer: [
        {
          name: "Tahu Goreng",
          price: 5,
          image: {
            uri: "https://www.vforveganista.com/wp-content/uploads/2020/11/hero-edited-10-470x313.jpg",
          },
        },
      ],
    },
  },
  {
    id: "3",
    name: "Sushi Kyu",
    rating: 4.8,
    reviews: 1920,
    price: 59,
    distance: "3.1",
    deliveryTime: "18 min",
    description: "Authentic Japanese sushi and rolls",
    promo: "10% off today",
    freeDelivery: true,
    imageUrl: {
      uri: "https://thumbs.dreamstime.com/b/una-bandeja-de-rollos-sushi-con-pepino-y-zanahorias-generado-por-ai-315244311.jpg",
    },
    menu: {
      Popular: [
        {
          name: "Salmon Nigiri",
          price: 15,
          image: {
            uri: "https://img.freepik.com/fotos-premium/rollos-sushi-sabroso-placa-piedra-salsas_73558-5248.jpg",
          },
        },
        {
          name: "California Roll",
          price: 12,
          image: {
            uri: "https://s3.pixers.pics/pixers/700/FO/12/92/06/43/700_FO12920643_c6260ea2ae6ada759e874fbd0bd3be28.jpg",
          },
        },
      ],
      "Main Courses": [
        {
          name: "Sushi Platter",
          price: 25,
          image: {
            uri: "https://t4.ftcdn.net/jpg/02/29/88/27/360_F_229882761_ZNrEIZ8aYH7RKqURwsRfRL888QF04FeT.jpg",
          },
        },
      ],
      Appetizer: [
        {
          name: "Miso Soup",
          price: 4,
          image: {
            uri: "https://miro.medium.com/v2/resize:fit:1400/1*sNNpvxyE2bsDGo3dwgJF7Q@2x.jpeg",
          },
        },
      ],
    },
  },
  {
    id: "4",
    name: "El Taco Loco",
    rating: 4.5,
    reviews: 890,
    price: 29,
    distance: "5.2",
    deliveryTime: "25 min",
    description: "Best tacos and Mexican food in town",
    promo: "Free drink with any combo",
    freeDelivery: false,
    imageUrl: {
      uri: "https://img.freepik.com/fotos-premium/deliciosos-tacos-ingredientes-frescos_948135-13307.jpg",
    },
    menu: {
      Popular: [
        {
          name: "Taco Al Pastor",
          price: 8,
          image: {
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Taco_al_pastor-1.jpg/1200px-Taco_al_pastor-1.jpg",
          },
        },
        {
          name: "Quesadilla",
          price: 7,
          image: {
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Pa_rrxoa5wJOSDXXD6G-UD90Kv4eYPq-vEC1cWdnlpy1rei2",
          },
        },
      ],
      "Main Courses": [
        {
          name: "Burrito Supremo",
          price: 11,
          image: {
            uri: "https://static.vecteezy.com/system/resources/thumbnails/049/189/231/small/nacho-cheese-beef-wraps-photo.jpg",
          },
        },
      ],
      Appetizer: [
        {
          name: "Nachos con Guacamole",
          price: 6,
          image: {
            uri: "https://img.freepik.com/foto-gratis/guacamole-fresco-chip-tortilla-delicioso-aperitivo-mexicano-generado-inteligencia-artificial_188544-110652.jpg",
          },
        },
      ],
    },
  },
];
