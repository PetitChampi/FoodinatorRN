import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { colors, spacing, typography, borderRadius, shadows } from "../styles/theme";

interface MealCardProps {
  imageUrl?: string;
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}

export const MealCard: React.FC<MealCardProps> = ({
  imageUrl,
  title,
  onClick,
  children,
}) => {
  // Create a test ID from the title
  const testId = `meal-card-${title.toLowerCase().replace(/\s+/g, "-")}`;

  // Map image URLs to local requires
  // Extract filename from URL (e.g., "/img-meals/pasta-bolognese.jpg" -> "pasta-bolognese")
  const getImageSource = (url?: string) => {
    if (!url) return null;
    
    const filename = url.split("/").pop()?.replace(".jpg", "");
    
    // Map of all meal images
    const imageMap: { [key: string]: any } = {
      "avocado-toasts": require("../assets/images/img-meals/avocado-toasts.jpg"),
      "boeuf-bourguignon": require("../assets/images/img-meals/boeuf-bourguignon.jpg"),
      "burgers": require("../assets/images/img-meals/burgers.jpg"),
      "chic-broc": require("../assets/images/img-meals/chic-broc.jpg"),
      "chicken-skewers": require("../assets/images/img-meals/chicken-skewers.jpg"),
      "chickpea-chard-pork": require("../assets/images/img-meals/chickpea-chard-pork.jpg"),
      "epic-beans-steak": require("../assets/images/img-meals/epic-beans-steak.jpg"),
      "fishy-pasta": require("../assets/images/img-meals/fishy-pasta.jpg"),
      "fisn-n-mash": require("../assets/images/img-meals/fisn-n-mash.jpg"),
      "lamb-potatoes": require("../assets/images/img-meals/lamb-potatoes.jpg"),
      "luxury-jambon-beurre": require("../assets/images/img-meals/luxury-jambon-beurre.jpg"),
      "mex-bean-casserole": require("../assets/images/img-meals/mex-bean-casserole.jpg"),
      "mushroom-risotto": require("../assets/images/img-meals/mushroom-risotto.jpg"),
      "pasta-bolognese": require("../assets/images/img-meals/pasta-bolognese.jpg"),
      "pasta-carbonara": require("../assets/images/img-meals/pasta-carbonara.jpg"),
      "pesto-chicken-gnocchi": require("../assets/images/img-meals/pesto-chicken-gnocchi.jpg"),
      "pistachio-pesto-gnocchi": require("../assets/images/img-meals/pistachio-pesto-gnocchi.jpg"),
      "poule-au-pot": require("../assets/images/img-meals/poule-au-pot.jpg"),
      "prawn-burritos": require("../assets/images/img-meals/prawn-burritos.jpg"),
      "prosciutto-mozza-focaccia": require("../assets/images/img-meals/prosciutto-mozza-focaccia.jpg"),
      "salmon-bagels": require("../assets/images/img-meals/salmon-bagels.jpg"),
      "salmon-poke-plate": require("../assets/images/img-meals/salmon-poke-plate.jpg"),
      "seafood-risotto": require("../assets/images/img-meals/seafood-risotto.jpg"),
      "tom-mozza-bruschetta": require("../assets/images/img-meals/tom-mozza-bruschetta.jpg"),
      "tuna-gnocchi": require("../assets/images/img-meals/tuna-gnocchi.jpg"),
      "tuna-pita": require("../assets/images/img-meals/tuna-pita.jpg"),
    };
    
    return filename ? imageMap[filename] : null;
  };

  const imageSource = getImageSource(imageUrl);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onClick}
      testID={testId}
      activeOpacity={0.7}
    >
      {imageSource && (
        <View style={styles.imageContainer} testID={`${testId}-image`}>
          <Image 
            source={imageSource}
            style={styles.image}
            testID={`${testId}-img`}
            resizeMode="cover"
          />
        </View>
      )}
      <View style={styles.cardText} testID={`${testId}-text`}>
        <Text style={styles.title} testID={`${testId}-title`}>
          {title}
        </Text>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    ...shadows.sm,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: 150,
    backgroundColor: colors.gray6,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cardText: {
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
});
