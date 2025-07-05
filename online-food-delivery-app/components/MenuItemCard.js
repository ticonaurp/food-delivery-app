import React from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { formatearSoles } from "../utils/currencyUtils"
import styles from "../screens/RestaurantScreen/MenuItemCard.styles"

export default function MenuItemCard({
  item,
  quantity,
  onAdd,
  onUpdateQty,
  onAddMultiple,
}) {
  return (
    <View style={styles.menuItem}>
      <View style={styles.menuItemContent}>
        <View style={styles.menuItemInfo}>
          <Text style={styles.menuTitle}>{item.name}</Text>
          <Text style={styles.menuDescription}>
            {item.description}
          </Text>
          <Text style={styles.menuPrice}>
            {item.discountPrice ? (
              <>
                <Text style={styles.originalPrice}>
                  {formatearSoles(item.price)}
                </Text>{" "}
                <Text style={styles.discountPrice}>
                  {formatearSoles(item.discountPrice)}
                </Text>
              </>
            ) : (
              formatearSoles(item.price)
            )}
          </Text>
        </View>
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={styles.menuItemImage}
          />
        )}
      </View>

      <View style={styles.menuItemActions}>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onUpdateQty(-1)}
          >
            <Ionicons name="remove" size={20} color="#E94864" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onUpdateQty(1)}
          >
            <Ionicons name="add" size={20} color="#E94864" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={quantity > 0 ? onAddMultiple : onAdd}
        >
          <Text style={styles.addButtonText}>
            {quantity > 0 ? `Agregar ${quantity}` : "Agregar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
