import { FlatList, Image, ImageBackground } from "react-native";
import { useState } from "react";

import { Text } from "../Text";

import { CategoryContainer, Icon } from "./styles";
import { Category } from "../../types/Category";

interface CategoriesProps {
    categories: Category[];
    onSelectCategory: (categoryId: string) => Promise<void>;
}

export function Categories({ categories, onSelectCategory }: CategoriesProps) {
    const [selectedCategory, setSelectedCategory] = useState("");

    function handleSelectCategory(categoryId: string) {
        const category = selectedCategory === categoryId ? "" : categoryId;

        onSelectCategory(category);
        setSelectedCategory(category);
    }

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 }}
            data={categories}
            keyExtractor={(category) => category._id}
            renderItem={({ item: category }) => {
                const isSelected = selectedCategory === category._id;
                return (
                    <CategoryContainer
                        onPress={() => handleSelectCategory(category._id)}
                    >
                        <Icon>
                            <Image
                                style={{
                                    width: 32,
                                    height: 32,
                                    opacity: isSelected ? 1 : 0.5,
                                }}
                                source={{
                                    uri: category.icon,
                                }}
                            />
                        </Icon>
                        <Text
                            opacity={isSelected ? 1 : 0.5}
                            size={14}
                            weight="600"
                        >
                            {category.name}
                        </Text>
                    </CategoryContainer>
                );
            }}
        />
    );
}
