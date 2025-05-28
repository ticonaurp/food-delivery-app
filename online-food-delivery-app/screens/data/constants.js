import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export const weeklyDeals = [
  {
    id: "1",
    title: "Today's Best Deals",
    image: require("../../assets/pizza1.png"),
    description: "Off up to 75%",
  },
  {
    id: "2",
    title: "Weekly Best Deals",
    image: require("../../assets/burger.png"),
    description: "Off up to 50%",
  },
  {
    id: "3",
    title: "Sushi Special",
    image: require("../../assets/sushi.png"),
    description: "Off up to 30%",
  },
];

export const quickMenuItems = [
  {
    label: "Near me",
    icon: <FontAwesome6 name="map-location-dot" size={28} color="#f43f5e" />,
  },
  {
    label: "Popular",
    icon: <FontAwesome5 name="award" size={28} color="#f43f5e" />,
  },
  {
    label: "Discount",
    icon: <MaterialIcons name="discount" size={28} color="#f43f5e" />,
  },
  {
    label: "24 Hours",
    icon: <MaterialCommunityIcons name="hours-24" size={28} color="#f43f5e" />,
  },
  {
    label: "Quick Delivery",
    icon: <MaterialIcons name="delivery-dining" size={28} color="#f43f5e" />,
  },
];
