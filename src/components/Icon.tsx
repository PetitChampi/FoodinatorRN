import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleProp, TextStyle } from "react-native";

interface IconProps {
  name: "list" | "calendar-week" | "shopping-bag" | "filter" | "carrot" | "list-numbers" | "search" | "tools-kitchen" | "chevron-down";
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

// Map custom icon names to Ionicons names
const iconMap: Record<string, string> = {
  "list": "list-outline",
  "calendar-week": "calendar-outline",
  "shopping-bag": "bag-outline",
  "filter": "filter-outline",
  "carrot": "nutrition-outline",
  "list-numbers": "list-outline",
  "search": "search-outline",
  "tools-kitchen": "restaurant-outline",
  "chevron-down": "chevron-down-outline",
};

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = "#3F3B3B",
  style 
}) => {
  const ionName = iconMap[name] || "help-outline";
  
  return (
    <Ionicons 
      name={ionName} 
      size={size} 
      color={color}
      style={style}
    />
  );
};
